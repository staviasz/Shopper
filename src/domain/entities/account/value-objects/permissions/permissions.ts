import { ValueObject } from '@/shared/domain';
import { Either, right } from '@/shared/either';

// export type PermissionsProps = string;

export class Permissions extends ValueObject {
  private constructor(props: string) {
    super(props);
    Object.freeze(props);
  }

  static create(props: string): Either<Error, Permissions> {
    return right(new Permissions(props));
  }
}
