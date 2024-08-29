/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeNestRouter } from '@/factories';
import { makeMeasureUploadController } from '@/factories/controllers/measure/measure-upload-controller-factory';
import { Controller, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { MeasureUploadRoutesDto } from './dtos';

@ApiTags('Measure')
@Controller('/upload')
export class MeasureUploadRoute {
  @Post()
  @ApiOperation({
    summary: 'Recupera o valor da medição através de uma imagem base64',
  })
  @ApiBody({ type: MeasureUploadRoutesDto })
  @ApiResponse({
    status: 200,
    description: 'Sucesso: retorna o valor da medição, uma url da imagem, e o uuid da medição',
  })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 409, description: 'Double Report: Requisição duplicada' })
  async handle(@Req() req: Request, @Res() res: Response): Promise<void> {
    const adapterNest = makeNestRouter(await makeMeasureUploadController());
    await adapterNest.adapt(req, res);
  }
}
