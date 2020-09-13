import { Component, OnInit, ChangeDetectionStrategy, Input, forwardRef } from '@angular/core';
import { BaseComponent } from '../base-component.class';
import { idValue } from '@type/id-value.type';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioComponent extends BaseComponent implements OnInit {
  @Input() name;
  @Input() list: idValue[];

  ngOnInit(): void {
    if (this.type === 'gender') {
      this.list = [{
        id: 0,
        value: 'Мужской'
      }, {
        id: 1,
        value: 'Женский'
        }];
      this.label = 'Ваш пол';
    }
  }
}
