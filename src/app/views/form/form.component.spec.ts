import { SharedModule } from '@/app/shared/shared.module';
import { ChangeDetectorRef } from '@angular/core';
import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormComponent } from './form.component';
import { FormService } from './state/form.service';

describe('FormComponent', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(
    fakeAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule,
          SharedModule,
          BrowserAnimationsModule
        ],
        providers: [
          FormBuilder,
          ChangeDetectorRef,
          { provide: FormService, useClass: MockService },
        ],
        declarations: [FormComponent]
      })
        .compileComponents();
    })
  );

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should be null value and valid form', () => {
    const formGroup = component.profileForm.controls;
    let date = new Date();
    const inputDatePicker = fixture.nativeElement.querySelector('input.mat-datepicker-input');

    fixture.ngZone.runOutsideAngular(() => {
      formGroup.name.setValue('Иван Иванович');
      formGroup.gender.setValue({
        id: 0,
        value: 'Мужской'
      });
      formGroup.email.setValue('test@test.com');
      date.setFullYear(date.getFullYear() - 30);

      inputDatePicker.dispatchEvent(new Event('dateChange'));
      formGroup.dob.setValue(date);
      formGroup.familyStatus.setValue({ id: 3, value: 'Нет' });
      fixture.detectChanges();
    });

    fixture.ngZone.runOutsideAngular(() => {
      date.setFullYear(date.getFullYear() + 20);
      inputDatePicker.dispatchEvent(new Event('dateChange'));
      formGroup.dob.patchValue(date);
      fixture.detectChanges();
    })

    component.submit();
    expect(!formGroup.familyStatus.value && component.profileForm.valid).toBeTruthy();
  });
});

class MockService {
  update(value: any) {
    return true;
  }
}
