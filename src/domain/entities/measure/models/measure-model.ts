import type { MeasureEnumType } from '../types/measure-enum-type';

export type MeasureModel = {
  id?: string;
  customerCode: string;
  dateTime: Date;
  type: MeasureEnumType;
  value?: number;
};
