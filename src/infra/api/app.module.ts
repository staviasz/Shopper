import { Module } from '@nestjs/common';
import { MeasureModule } from './routes/measure/measure.module';

@Module({
  imports: [MeasureModule],
})
export class AppModule {}
