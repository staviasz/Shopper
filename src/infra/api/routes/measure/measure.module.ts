import { Module } from '@nestjs/common';
import { MeasureConfirmRoute } from './measure-confirm-route';
import { MeasureUploadRoute } from './measure-upload-route';

@Module({
  controllers: [MeasureUploadRoute, MeasureConfirmRoute],
})
export class MeasureModule {}
