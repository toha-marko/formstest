import { idValue } from '@misc/typing/id-value.type';

export type FormModel = {
  name: string,
  gender: idValue,
  dob: any,
  familyStatus: idValue | null,
  kids: number | null,
  email: string,
  comment: string | null
};
