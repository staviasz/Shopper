import {
  FieldIsRequiredError,
  InvalidFieldError,
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
    Object.freeze(this);
  }

  get customerCode(): string {
    return this.props.customerCode;
  }

  get imageBase64(): string {
    return this.props.imageBase64;
  }

  get dateTime(): Date {
    return this.props.dateTime;
  }

  get type(): MeasureEnumType {
    return this.props.type;
  }

  static create(props: MeasureModel): Either<CustomError, MeasureEntityDomain> {
    this.clearErrors();

    const idOrError = this.validateId(props.id);
    const costumerOrError = this.hasCustomerCode(props.customerCode);
    const imageBase64OrError = this.hasImageBase64(props.imageBase64);
    const dateTimeOrError = this.hasDateTime(props.dateTime);
    const typeOrError = this.hasCorrectType(props.type);

    if (this.errors()) {
      return left(this.errors()!);
    }

    return right(
      new MeasureEntityDomain({
        id: idOrError.value as string,
        customerCode: costumerOrError as string,
        imageBase64: imageBase64OrError as string,
        dateTime: dateTimeOrError as Date,
        type: typeOrError as MeasureEnumType,
      }),
    );
  }

  private static hasCustomerCode(costumerCode: string): string | null {
    if (!costumerCode) {
      this.addError(new FieldIsRequiredError('código do cliente'));
    }
    return this.errors() ? null : costumerCode;
  }

  private static hasImageBase64(imageBase64: string): string | null {
    if (!imageBase64) {
      this.addError(new FieldIsRequiredError('imagem base64'));
    }

    const base64ImageRegex = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/;

    if (!base64ImageRegex.test(imageBase64)) {
      this.addError(new InvalidFieldError('imagem base64'));
    }
    return this.errors() ? null : imageBase64;
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
}
