import { Module } from '@nestjs/common';
import { MeasureUploadRoute } from './measure-upload-route';

@Module({
  controllers: [MeasureUploadRoute],
})
export class MeasureModule {}
