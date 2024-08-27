import type { MeasureEnumType } from '../types/measure-enum-type';

export type MeasureModel = {
  id?: string;
  customerCode: string;
  imageBase64: string;
  dateTime: Date;
  type: MeasureEnumType;
};
