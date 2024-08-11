import { Id } from '@/domain/shared/value-objects/id/id-value-object';
import { ActivityType, Category, Datetime, Description, Title, WeeklyFrequency } from '../value-objects';

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
