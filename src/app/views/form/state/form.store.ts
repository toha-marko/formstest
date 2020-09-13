import { Injectable } from '@angular/core';
import { StoreConfig, EntityStore, EntityState, ID, ActiveState, HashMap } from '@datorama/akita';
import { FormModel } from './form.model';

export interface FormState extends EntityState<FormModel, number>, ActiveState {
  readyForRedirect: boolean;
}

const initialState = {
  ui: { readyForRedirect: false }
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'form' })
export class FormStore extends EntityStore<FormState> {
  constructor() {
    super(initialState);
  }

  updateReadyForRedirect(ready: boolean) {
    this.update({ ui: { readyForRedirect: ready } });
  }
}
