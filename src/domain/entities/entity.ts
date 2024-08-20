import { IdValueObject } from '@/domain/shared/value-objects/id/id-value-object';

type Props = { id: IdValueObject } & Record<string, any>;
export abstract class Entity<T extends Props> {
  private static _errors: Error[] = [];

  protected constructor(protected readonly props: T) {}

  get id(): string {
    return this.props.id.value;
  }

  protected static errors(): Error[] | null {
    return this._errors.length ? this._errors : null;
  }

  protected static addError(error: Error | Error[]): void {
    if (Array.isArray(error)) {
      this._errors = this._errors.concat(error);
      return;
    }
    this._errors.push(error);
  }

  protected static clearErrors(): void {
    this._errors = [];
  }

  protected static formatErrors(): string[] {
    return this._errors.map(error => error.message);
  }
}
