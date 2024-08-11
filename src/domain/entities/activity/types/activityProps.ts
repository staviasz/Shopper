import { ActivityType, Categories, WeeklyFrequency } from '.';

export type ActivityProps = {
  id: string;
  customerId: string;
  title: string;
  description: string;
  executeDateTime: Date;
  type: ActivityType;
  category: Categories;
  weeklyFrequency?: WeeklyFrequency;
};
