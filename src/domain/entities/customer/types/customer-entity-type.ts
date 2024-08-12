import { EmailValueObject, NameValueObject } from '@/domain/entities/customer/value-objects';
import { Id } from '@/domain/shared/value-objects/id/id-value-object';

export type CustomerEntityType = {
  id: Id;
  name: NameValueObject;
  email: EmailValueObject;
};
