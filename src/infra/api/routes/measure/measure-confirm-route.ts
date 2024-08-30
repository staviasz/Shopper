/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeNestRouter } from '@/factories';
import { makeMeasureConfirmController } from '@/factories/controllers/measure/measure-confirm-controller-factory';
import { Controller, Patch, Req, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { MeasureConfirmRoutesDto } from './dtos/measure-confirm.dto';

@ApiTags('Measure')
@Controller('/confirm')
export class MeasureConfirmRoute {
  @Patch()
  @ApiOperation({
    summary: 'Comfirmar o valor recebido da medição',
  })
  @ApiBody({ type: MeasureConfirmRoutesDto })
  @ApiResponse({
    status: 200,
    description: 'Sucesso: retorna menssagem de sucesso',
  })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 409, description: 'Double Report: Requisição duplicada' })
  @ApiResponse({ status: 404, description: 'Not Found: Measure not found' })
  async handle(@Req() req: Request, @Res() res: Response): Promise<void> {
    const adapterNest = makeNestRouter(await makeMeasureConfirmController());
    await adapterNest.adapt(req, res);
  }
}
