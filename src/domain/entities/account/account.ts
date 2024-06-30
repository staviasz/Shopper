import { Entity } from '@/shared/domain';
import { UniqueEntityId } from '@/shared/domain/unique-entity-id';
import { Email, Password, CreatedAt, VerifiedAt, UpdatedAt, Permissions } from './value-objects';
import { CreateAccountData, CreateAccountResponse } from './account-types';
import { left, right } from '@/shared/either';

export type AccountProps = {
  email: Email;
  password: Password;
  permissions: Permissions[];
  verifiedAt?: VerifiedAt;
  updatedAt?: UpdatedAt;
  createdAt?: CreatedAt;
  // profileId?: string | null;
};

export class Account extends Entity<AccountProps> {
  private constructor(props: AccountProps, id?: UniqueEntityId) {
    super(props, id);
    Object.freeze(this);
  }

  get email(): string {
    return this.props.email.value;
  }

  get password(): string {
    return this.props.password.value;
  }

  get permissions(): string[] {
    return this.props.permissions.map(permission => permission.value);
  }

  // get profileId(): string {
  //   return this.props.profileId;
  // }

  get verifiedAt(): Date {
    return this.props.verifiedAt.value;
  }

  get updatedAt(): Date {
    return this.props.updatedAt.value;
  }

  get createdAt(): Date {
    return this.props.createdAt.value;
  }

  static create(data: CreateAccountData): CreateAccountResponse {
    const { email, password, permissions, verifiedAt, createdAt, updatedAt } = data;

    const emailOrError = Email.create(email);
    const passwordOrError = Password.create(password);
    const permissionsOrErrors = permissions ? permissions.map(permission => Permissions.create(permission)) : [];
    // const profileIdOrError = profileId;
    const verifiedAtOrError = VerifiedAt.create(verifiedAt);
    const createdAtOrError = CreatedAt.create(createdAt);
    const updatedAtOrError = UpdatedAt.create(updatedAt);

    const results = [
      emailOrError,
      passwordOrError,
      ...permissionsOrErrors,
      // profileIdOrError,
      verifiedAtOrError,
      createdAtOrError,
      updatedAtOrError,
    ];

    for (const result of results) {
      if (result.isLeft()) return left(result.value);
    }

    return right(
      new Account(
        {
          email: emailOrError.value as Email,
          password: passwordOrError.value as Password,
          permissions: permissionsOrErrors.map(permission => permission.value) as Permissions[],
          verifiedAt: verifiedAtOrError.value as VerifiedAt,
          createdAt: createdAtOrError.value as CreatedAt,
          updatedAt: updatedAtOrError.value as UpdatedAt,
        },
        new UniqueEntityId(data.id),
      ),
    );
  }
}
