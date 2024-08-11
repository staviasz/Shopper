import { Id } from '@/domain/shared/value-objects/id/id-value-object';
import { Title } from '../value-objects';
import { Description } from '../value-objects/description/description-value-object';

export type ActivityEntityProps = {
  id: Id;
  title: Title;
  description: Description;
};
