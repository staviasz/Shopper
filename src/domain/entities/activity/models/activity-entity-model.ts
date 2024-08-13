import { IdValueObject } from '@/domain/shared/value-objects/id/id-value-object';
import {
  ActivityTypeValueObject,
  CategoryValueObject,
  DatetimeValueObject,
  DescriptionValueObject,
  TitleValueObject,
  WeeklyFrequencyValueObject,
} from '../value-objects';

export type ActivityEntityModel = {
  id: IdValueObject;
  customerId: IdValueObject;
  title: TitleValueObject;
  description: DescriptionValueObject;
  executeDateTime: DatetimeValueObject;
  type: ActivityTypeValueObject;
  category: CategoryValueObject;
  weeklyFrequency?: WeeklyFrequencyValueObject;
};
