export type FormModel = {
  firstName: string;
  lastName: string;
};

export function createForm(params: Partial<FormModel> = {}): FormModel {
  return {
    firstName: '',
    lastName: '',
    ...params
  } as FormModel;
}
