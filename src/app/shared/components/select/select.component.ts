import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Input, OnDestroy } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { idValue } from '@misc/typing/id-value.type';
import { BaseComponent } from '../base-component.class';

@Component({
  selector: 'app-form-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() list: idValue[];

  select = new FormControl(null);
  selectSubscription: Subscription;

  ngOnInit(): void {
    this.selectSubscription = this.select.valueChanges.subscribe(newVal => this.refreshValue(newVal));
  }

  ngOnDestroy(): void {
    if (this.selectSubscription) {
      this.selectSubscription.unsubscribe();
    }
  }
}
