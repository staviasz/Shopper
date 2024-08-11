export enum WeekDays {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday',
}

export type WeeklyFrequency = {
  quantityPerWeek?: number;
  weekDays?: WeekDays[];
  finallyDate?: Date;
};
