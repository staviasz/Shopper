import { Email, Name } from '@/domain/entities/customer/value-objects';
import { Id } from '@/domain/shared/value-objects/id/id-value-object';

export type CustomerEntityProps = {
  id: Id;
  name: Name;
  email: Email;
};
