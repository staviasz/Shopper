import { ActivityEnumType, CategoriesEnumType, WeeklyFrequencyType } from '@/domain/entities/activity/types';

export type ActivityType = {
  id: string;
  customerId: string;
  title: string;
  description: string;
  executeDateTime: Date;
  type: ActivityEnumType;
  category: CategoriesEnumType;
  weeklyFrequency?: WeeklyFrequencyType;
};
