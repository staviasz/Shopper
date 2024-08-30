import { ZodHelper } from '@/infra/validators/helper/zod-helper-infra';
import type { ValidationContract } from '@/presentation/contracts';
import type { Either } from '@/shared/either';
import { z } from 'zod';

export class MeasureConfirmValidator implements ValidationContract {
  validate(input: any): Either<Error, void> {
    const schema = z.object({
      id: z.string({ required_error: 'O campo id é obrigatório' }),
      value: z
        .number({
          required_error: 'O campo valor é obrigatório',
        })
        .refine(
          value => {
            return value > 0;
          },
          {
            message: 'O campo valor deve ser um número positivo',
          },
        ),
    });

    return ZodHelper.check({ schema, value: input });
  }
}
