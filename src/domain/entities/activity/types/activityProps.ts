import { ActivityType } from './activityType';

export type ActivityProps = {
  id: string;
  title: string;
  description: string;
  executeDateTime: Date;
  type: ActivityType;
};
