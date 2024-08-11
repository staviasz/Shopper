import {
  ActivityType,
  Category,
  Datetime,
  Description,
  Title,
  WeeklyFrequency,
} from '@/domain/entities/activity/value-objects';
import { Id } from '@/domain/shared/value-objects/id/id-value-object';

export type ActivityEntityProps = {
  id: Id;
  customerId: Id;
  title: Title;
  description: Description;
  executeDateTime: Datetime;
  type: ActivityType;
  category: Category;
  weeklyFrequency?: WeeklyFrequency;
};
