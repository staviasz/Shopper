export interface CustomError extends Error {
  errorFormatted?: () => { errors: string[] };
}

type EitherError = CustomError | CustomError[];

export type Either<L extends EitherError, R> = Left<L, R> | Right<L, R>;
class Left<L extends EitherError, R> {
  constructor(readonly value: L) {}

  isLeft(): this is Left<L, R> {
    return true;
  }

  isRight(): this is Right<L, R> {
    return false;
  }
  errorFormatted() {
    if (!Array.isArray(this.value) && this.value.errorFormatted) {
      return this.value.errorFormatted();
    }
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
