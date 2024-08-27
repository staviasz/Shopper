import type { MeasureEnumType } from '../types/measure-enum-type';

export type MeasureEntityModel = {
  id: string;
  customerCode: string;
  imageBase64: string;
  dateTime: Date;
  type: MeasureEnumType;
};
