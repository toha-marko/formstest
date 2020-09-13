import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { distinctUntilArrayItemChanged } from '@datorama/akita';
import { idValue } from '@misc/typing/id-value.type';
import { combineLatest, defer, merge, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, map, startWith, take, tap } from 'rxjs/operators';
import { validateDOB } from '@validators/dob.validator';
import { FormService } from './state/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {

  profileForm = this.fb.group({
    name: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    dob: [null, [Validators.required, validateDOB]],
    familyStatus: [null],
    kids: [null],
    email: [null, [Validators.required, Validators.email]],
    comment: [null]
  });

  familyStatuses$: Observable<idValue[]>;
  familyStatus18Plus$: Observable<boolean>;

  profileFormErrors = {}; // custom errors and validation states

  formSubmitDisabled; // default button is enabled
  private $submitFail = new Subject<any>();

  private familyStatuses: idValue[] = [
    { id: 0, value: 'Замужем' },
    { id: 1, value: 'Женат' },
    { id: 2, value: 'В разводе' },
    { id: 3, value: 'Нет' },
  ];


  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private formService: FormService) {
  }

  ngOnInit(): void {
    this.resetForm();
    this.setErrorsState(this.profileForm.controls);

    this.familyStatus18Plus$ = this.profileForm.get('dob').valueChanges.pipe( // check for 18+ age
      distinctUntilChanged(),
      map(dob => {
        const currentDate = new Date();
        return currentDate.setFullYear(currentDate.getFullYear() - 18) >= new Date(dob).getTime();
      }),
      distinctUntilChanged(), // set dynamic validator to field if needed
      tap(adult => {
        this.profileForm.controls.familyStatus.setValidators(adult ? Validators.required : []);
        this.profileForm.get('familyStatus').patchValue(null);
        setTimeout(() => this.profileForm.controls.familyStatus.updateValueAndValidity());
      })
    );

    this.familyStatuses$ = merge(
      defer(() => of(this.profileForm.get('gender').value)), // init Start value with current selection
      this.profileForm.get('gender').valueChanges
    ).pipe(
      distinctUntilChanged(),
      map(gender => {
        return this.familyStatuses.filter(status => status.id !== gender?.id);
      })
    );
  }

  submit(): void {
    if (this.profileForm.invalid) {
      return this.$submitFail.next(true);
    }
    this.formService.update(this.profileForm.value);
  }

  private resetForm(): void { // form reset after 3 tries
    this.profileForm.reset();
    this.$submitFail.pipe(
      take(3),
      tap(() => this.formSubmitDisabled = true),
      delay(10000),
      tap(() => this.formSubmitDisabled = false)
    ).subscribe({
      next: () => this.cdRef.detectChanges(),
      complete: () => this.resetForm()
    });
  }

  private setErrorsState(list: { [key: string]: AbstractControl }): void { // set errors listener to our custom input components
    for (const key in list) {
      if (key) {
        const currentElement = this.profileForm.get(key);
        this.profileFormErrors[`${key}$`] = combineLatest([
          currentElement.statusChanges.pipe(startWith(currentElement.status)),
          this.$submitFail
        ]).pipe(
          distinctUntilArrayItemChanged(),
          debounceTime(300),
          map(values => { // errors parser
            return values[0] !== 'VALID' ? 'Поле является обязательным или заполнено некорректно' : '';
          })
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.$submitFail.complete();
  }
}
