import {
  FieldIsRequiredError,
  InvalidFieldError,
  InvalidFieldPositiveNumberError,
  InvalidFieldsValuesError,
} from '@/domain/entities/measure/errors';
import { left, right, type Either } from '@/shared/either';
import { Entity } from '../entity';
import type { CustomError } from './errors/custon-error';
import type { MeasureEntityModel } from './models';
import type { MeasureModel } from './models/measure-model';
import { MeasureEnumType } from './types/measure-enum-type';

export class MeasureEntityDomain extends Entity<MeasureEntityModel> {
  private constructor(props: MeasureEntityModel) {
    super(props);
  }

  get customerCode(): string {
    return this.props.customerCode;
  }

  get dateTime(): Date {
    return this.props.dateTime;
  }

  get type(): MeasureEnumType {
    return this.props.type;
  }

  get value(): number | undefined {
    return this.props.value;
  }

  get hasConfirmed(): boolean {
    return this.props.hasConfirmed || false;
  }

  get imageUrl(): string | undefined {
    return this.props.imageUrl;
  }

  static create(props: MeasureModel): Either<CustomError, MeasureEntityDomain> {
    this.clearErrors();

    const idOrError = this.validateId(props.id);
    const costumerOrError = this.hasCustomerCode(props.customerCode);
    const dateTimeOrError = this.hasDateTime(props.dateTime);
    const typeOrError = this.hasCorrectType(props.type);
    const valueOrError = this.validateValue(props.value);

    if (this.errors()) {
      return left(this.errors()!);
    }

    return right(
      new MeasureEntityDomain({
        id: idOrError.value as string,
        customerCode: costumerOrError as string,
        dateTime: dateTimeOrError as Date,
        type: typeOrError as MeasureEnumType,
        value: valueOrError as number,
      }),
    );
  }

  private static hasCustomerCode(costumerCode: string): string | null {
    if (!costumerCode) {
      this.addError(new FieldIsRequiredError('código do cliente'));
    }
    return this.errors() ? null : costumerCode;
  }

  private static hasDateTime(dateTime: Date): Date | null {
    if (!dateTime) {
      this.addError(new FieldIsRequiredError('data e hora'));
    }
    return this.errors() ? null : dateTime;
  }

  private static hasCorrectType(type: string): MeasureEnumType | null {
    const KeysType = Object.values(MeasureEnumType);

    if (!type) {
      this.addError(new FieldIsRequiredError('tipo'));
    }

    const typeUpper = type.toUpperCase();
    if (typeUpper !== 'WATER' && typeUpper !== 'GAS') {
      this.addError(new InvalidFieldsValuesError('tipo', KeysType));
    }
    return this.errors() ? null : MeasureEnumType[type];
  }

  private static validateValue(value?: number): number | null {
    if (value !== 0 && !value) return null;

    if (value < 0) {
      Entity.addError(new InvalidFieldPositiveNumberError('valor'));
    }
    if (!Number.isInteger(value)) {
      Entity.addError(new InvalidFieldError('valor'));
    }

    return Entity.errors() ? null : value;
  }

  changeMeasureValue(value: number): Either<CustomError, MeasureEntityDomain> {
    Entity.clearErrors();
    MeasureEntityDomain.validateValue(value);

    return Entity.errors() ? left(Entity.errors()!) : right(this);
  }

  changeConfirmation(value: number): Either<CustomError, MeasureEntityDomain> {
    Entity.clearErrors();
    MeasureEntityDomain.validateValue(value);
    this.props.hasConfirmed = true;

    return Entity.errors() ? left(Entity.errors()!) : right(this);
  }

  changeImageUrl(imageUrl: string): Either<CustomError, MeasureEntityDomain> {
    Entity.clearErrors();
    this.props.imageUrl = imageUrl;
    return Entity.errors() ? left(Entity.errors()!) : right(this);
  }
}
