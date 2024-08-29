import { CustomError } from '@/domain/entities/measure/errors/custon-error';
import { type ZodHelperData } from '@/infra/validators/';
import { left, right, type Either } from '@/shared/either';
import { ZodError } from 'zod';

type ZodObjectError = {
  code: string;
  minimum: number;
  type: string;
  inclusive: boolean;
  exact: boolean;
  message: string;
  path: string[];
};

export class ZodHelper {
  static check(data: ZodHelperData): Either<CustomError, void> {
    try {
      data.schema.parse(data.value);
      return right();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const { message } = error;
        const parseMessage = JSON.parse(message);
        const errorsFormated = parseMessage.map(
          (err: ZodObjectError) =>
            new CustomError({ error_code: 'INVALID_DATA', error_description: err.message }),
        );

        return left(errorsFormated);
      }
      return left(error);
    }
  }
}
