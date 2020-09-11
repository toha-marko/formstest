import { Directive, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, Validator } from '@angular/forms';

@Directive()
export abstract class BaseComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() type?: string = 'text';
  @Input() placeholder?: string = '';
  @Input() disabled?: boolean;
  @Input() icon?: string;
  @Input() hint?: string;
  @Input() error?: string;
  @Input() validators?: Validator[] = [];

  value: any;

  constructor() {
  }
  onChange: (_: any) => void;
  onTouched: () => void;

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  refreshValue(input: any): void {
    console.log(input)
    this.writeValue(input);
    this.onChange(input);
  }
}
