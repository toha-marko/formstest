import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormModel } from './form.model';
import { FormStore } from './form.store';

@Injectable({ providedIn: 'root' })
export class FormService {

  constructor(private formStore: FormStore, private router: Router) {
  }

  update(data: FormModel): void {
    this.formStore.set({ 0: data });
    this.formStore.setActive(0);
    this.formStore.updateReadyForRedirect(true);
    this.redirectToReview();
  }

  redirectSetInitialState() {
    this.formStore.updateReadyForRedirect(false);
  }

  redirectToReview(): void {
    this.router.navigate(['form/preview']);
  }
}
