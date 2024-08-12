export enum WeekDaysEnumType {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday',
}

export type WeeklyFrequencyType = {
  quantityPerWeek?: number;
  weekDays?: WeekDaysEnumType[];
  finallyDate?: Date;
};
