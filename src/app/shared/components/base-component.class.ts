import { ChangeDetectorRef, Directive, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export abstract class BaseComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() type?: string = 'text';
  @Input() placeholder?: string = '';
  @Input() disabled?: boolean;
  @Input() icon?: string;
  @Input() hint?: string;
  @Input() error?: string;

  value: any;

  constructor(public cdRef: ChangeDetectorRef) {
  }

  onChange: (_: any) => void;
  onTouched: () => void;

  writeValue(obj: any): void {
    this.value = obj;
    this.cdRef.detectChanges();
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
    this.writeValue(input);
    this.onChange(input);
  }
}
