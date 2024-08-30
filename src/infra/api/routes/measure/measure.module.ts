import { Module } from '@nestjs/common';
import { MeasureConfirmRoute } from './measure-confirm-route';
import { MeasureListByCustomerRoute } from './measure-list-by-customer-route';
import { MeasureUploadRoute } from './measure-upload-route';

@Module({
  controllers: [MeasureUploadRoute, MeasureConfirmRoute, MeasureListByCustomerRoute],
})
export class MeasureModule {}
