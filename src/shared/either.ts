import type { CustomError, ObjectError } from '@/domain/entities/measure/errors/custon-error';

type EitherError = CustomError | CustomError[];

export type Either<L extends EitherError, R> = Left<L, R> | Right<L, R>;
class Left<L extends EitherError, R> {
  readonly value: ObjectError | ObjectError[];

  constructor(error: L) {
    // Formata o erro diretamente no construtor
    this.value = Array.isArray(error)
      ? error.map(err => ({ error_code: err.name, error_description: err.message }))
      : { error_code: error.name, error_description: error.message };
  }

  isLeft(): this is Left<L, R> {
    return true;
  }

  isRight(): this is Right<L, R> {
    return false;
  }
}

class Right<L extends EitherError, R> {
  constructor(readonly value: R) {}

  isLeft(): this is Left<L, R> {
    return false;
  }

  isRight(): this is Right<L, R> {
    return true;
  }
}

export const left = <L extends EitherError, R>(error: L): Left<L, R> => {
  return new Left<L, R>(error);
};

export function right<L extends EitherError, R extends void>(result?: R): Right<L, R>;
export function right<L extends EitherError, R>(result: R): Right<L, R>;
export function right<L extends EitherError, R>(result: R): Right<L, R> {
  return new Right<L, R>(result);
}
