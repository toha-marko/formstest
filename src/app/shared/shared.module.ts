import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

const components = [
  MatInputModule,
  MatDatepickerModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatRadioModule,
  MatSelectModule,
  MatFormFieldModule
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule
  ],
  exports: components
})
export class SharedModule { }
