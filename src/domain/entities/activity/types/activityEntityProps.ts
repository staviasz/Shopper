import { Id } from '@/domain/shared/value-objects/id/id-value-object';
import { Datetime, Title } from '../value-objects';
import { ActivityType } from '../value-objects/activityType/activity-value-object';
import { Description } from '../value-objects/description/description-value-object';

export type ActivityEntityProps = {
  id: Id;
  title: Title;
  description: Description;
  executeDateTime: Datetime;
  type: ActivityType;
};
