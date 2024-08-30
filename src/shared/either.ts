import type { CustomError, ObjectError } from '@/domain/entities/measure/errors/custon-error';

type EitherError = CustomError;

export type Either<L extends EitherError, R> = Left<L, R> | Right<L, R>;
class Left<L extends EitherError, R> {
  readonly value: ObjectError;
  // constructor(readonly value: L) {}

  constructor(private error: L) {
    this.value = { error_code: this.error.name, error_description: this.error.message };
  }

  isLeft(): this is Left<L, R> {
    return true;
  }

  isRight(): this is Right<L, R> {
    return false;
  }

  // formatedValue(): ObjectError | ObjectError[] {
  //   if (Array.isArray(this.error) && this.error.length > 1) {
  //     return this.error.map(err => ({ error_code: err.name, error_description: err.message }));
  //   }

  //   return Array.isArray(this.error)
  //     ? { error_code: this.error[0].name, error_description: this.error[0].message }
  //     : { error_code: this.error.name, error_description: this.error.message };
  // }
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
export function left<L extends EitherError, R>(error: L): Left<L, R>;
export function left<L extends EitherError, R>(error: L): Left<L, R> {
  return new Left<L, R>(error);
}

export function right<L extends EitherError, R extends void>(result?: R): Right<L, R>;
export function right<L extends EitherError, R>(result: R): Right<L, R>;
export function right<L extends EitherError, R>(result: R): Right<L, R> {
  return new Right<L, R>(result);
}
