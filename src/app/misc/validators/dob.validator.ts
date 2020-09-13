import { AbstractControl } from '@angular/forms';

export function validateDOB(control: AbstractControl) {
  const currentDateTime = new Date();

  const controlValue = new Date(control.value);

  if (currentDateTime < controlValue) {
    return { dobError: true };
  }
  return null;
}
