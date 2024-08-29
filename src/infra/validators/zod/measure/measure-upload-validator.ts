import { MeasureEnumType } from '@/domain/entities/measure/types/measure-enum-type';
import { ZodHelper } from '@/infra/validators/helper/zod-helper-infra';
import type { ValidationContract } from '@/presentation/contracts';
import type { Either } from '@/shared/either';
import { convertDatetimeStringToDate } from '@/utils/convert-datetime-string-to-date';
import { z } from 'zod';

export class MeasureUploadValidator implements ValidationContract {
  validate(input: any): Either<Error, void> {
    const schema = z.object({
      imageBase64: z.string({ required_error: 'O campo imagem base64 é obrigatório' }),
      dateTime: z
        .string({
          required_error: 'O campo data é obrigatório',
        })
        .refine(
          value => {
            return convertDatetimeStringToDate(value) !== null;
          },
          {
            message: 'O campo data esta inválido',
          },
        ),
      type: z.nativeEnum(MeasureEnumType, {
        message: 'O campo tipo deve ter um dos seguintes valores: WATER, GAS',
      }),
      customerCode: z.string({
        required_error: 'O campo código do cliente é obrigatório',
      }),
    });

    return ZodHelper.check({ schema, value: input });
  }
}
