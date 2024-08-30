import { ApiProperty } from '@nestjs/swagger';

export class MeasureConfirmRoutesDto {
  @ApiProperty({ description: 'Código da mediça' })
  measure_uuid: string;

  @ApiProperty({ description: 'Valor confirmado' })
  confirmed_value: number;

  constructor(measure_uuid: string, confirmed_value: number) {
    this.measure_uuid = measure_uuid;
    this.confirmed_value = confirmed_value;
  }
}
