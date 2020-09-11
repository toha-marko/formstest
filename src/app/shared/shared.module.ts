import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { InputComponent } from './components/input/input.component';
import { OnlyCyrillicDirective } from './directives/only-cyrillic.directive';
import { RadioComponent } from './components/radio/radio.component';
import { SelectComponent } from './components/select/select.component';
import { DobComponent } from './components/dob/dob.component';
import { TextareaComponent } from './components/textarea/textarea.component';

const MatComponents = [
  MatInputModule,
  MatDatepickerModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatRadioModule,
  MatSelectModule,
  MatFormFieldModule
];

const Components = [
  InputComponent,
  DobComponent,
  RadioComponent,
  SelectComponent,
  TextareaComponent
];

const Directives = [
  OnlyCyrillicDirective
];

@NgModule({
  declarations: [...Components, ...Directives],
  imports: [
    CommonModule,
    MatComponents
  ],
  exports: Components,
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'legacy' } }
  ]
})
export class SharedModule { }
