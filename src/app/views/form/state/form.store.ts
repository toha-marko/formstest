import { Injectable } from '@angular/core';
import { StoreConfig, EntityStore, EntityState, ID, ActiveState } from '@datorama/akita';
import { FormModel, createForm } from './form.model';

export interface FormState extends EntityState<FormModel>, ActiveState {
  id: ID;
}

export function createInitialState(): FormState {
  return {
    id: 0,
    active: this.id,
    ...createForm()
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'form' })
export class FormStore extends EntityStore<FormState> {
  constructor() {
    super(createInitialState());
  }
}
