import { FormatedEntityArrayErrors } from '@/shared/errors';

export const makeErrorsInObjOfArray = (errors: string[]): FormatedEntityArrayErrors => {
  return new FormatedEntityArrayErrors(errors);
};
