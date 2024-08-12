import { EmailValueObject, NameValueObject } from '@/domain/entities/customer/value-objects';
import { IdValueObject } from '@/domain/shared/value-objects/id/id-value-object';

export type CustomerEntityType = {
  id: IdValueObject;
  name: NameValueObject;
  email: EmailValueObject;
};
