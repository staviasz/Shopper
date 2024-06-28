import { Entity } from '@/shared/domain';
import { UniqueEntityId } from '@/shared/domain/unique-entity-id';

export type AccountProps = {
  email: string;
  password: string;
  permissions: [];
  verifiedAt?: Date | null;
  updatedAt?: Date | null;
  createdAt?: Date | null;
  profileId?: string | null;
};
export class Account extends Entity<AccountProps> {
  private constructor(props: AccountProps, id?: UniqueEntityId) {
    super(props, id);
    Object.freeze(this);
  }

  // get email(): string {
  //   return this.props.email.value;
  // }
}
