import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { FormState, FormStore } from './form.store';


@Injectable({ providedIn: 'root' })
export class FormQuery extends QueryEntity<FormState> {

  constructor(protected store: FormStore) {
    super(store);
  }

}
