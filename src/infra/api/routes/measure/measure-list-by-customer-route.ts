/* eslint-disable @typescript-eslint/no-unused-vars */
import { MeasureEnumType } from '@/domain/entities/measure/types/measure-enum-type';
import { makeNestRouter } from '@/factories';
import { makeMeasureListByCustomerController } from '@/factories/controllers/measure/measure-list-by-customer-controller-factory';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('Measure')
@Controller('/:customer_code/list')
export class MeasureListByCustomerRoute {
  @Get()
  @ApiOperation({
    summary: 'Comfirmar o valor recebido da medição',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso: retorna o as measures do customer',
  })
  @ApiParam({
    name: 'customer_code',
    type: String,
    description: 'Código do cliente',
    required: true,
  })
  @ApiQuery({
    name: 'type',
    enum: MeasureEnumType,
    required: false,
  })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 404, description: 'Not Found: Measure not found' })
  async handle(@Req() req: Request, @Res() res: Response): Promise<void> {
    const adapterNest = makeNestRouter(await makeMeasureListByCustomerController());
    await adapterNest.adapt(req, res);
  }
}
