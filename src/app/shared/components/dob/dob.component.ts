import { Component, OnInit, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from '../base-component.class';

@Component({
  selector: 'app-form-dob',
  templateUrl: './dob.component.html',
  styleUrls: ['./dob.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DobComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DobComponent extends BaseComponent implements OnInit {

  filterDob;

  ngOnInit(): void {
    if (this.type === 'dob') {
      this.filterDob = (d: Date | null): boolean => {
        const date = (d || new Date());
        return date <= new Date();
      };
      this.label = 'Ваша дата рождения';
    }

  }
}
