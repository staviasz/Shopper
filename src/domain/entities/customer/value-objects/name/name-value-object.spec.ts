import { InvalidName } from '@/domain/entities/customer/errors';
import { FieldIsRequired } from '@/domain/shared/errors';
import { Name } from './name-value-object';

describe('Name Value Object', () => {
  it('Should throw error if name is empty', () => {
    const name = Name.create('');

    expect(name.isLeft()).toBe(true);
    expect(name.isRight()).toBe(false);
    expect(name.value).toEqual(new FieldIsRequired('Name'));
  });

  it('Should throw error if name is invalid', () => {
    let name = Name.create('teste 1');
    expect(name.value).toEqual(new InvalidName());

    name = Name.create('teste *');
    expect(name.value).toEqual(new InvalidName());
  });

  it('Should return error if name is less than 3', () => {
    const name = Name.create('te');
    expect(name.isLeft()).toBe(true);
    expect(name.isRight()).toBe(false);
    expect(name.value).toEqual(new InvalidName());
  });

  it('Should return error if name is greater than 60', () => {
    const name = Name.create('teste'.repeat(13));
    expect(name.isLeft()).toBe(true);
    expect(name.isRight()).toBe(false);
    expect(name.value).toEqual(new InvalidName());
  });

  it('Should correct name', () => {
    const name = Name.create('teste');
    expect(name.value).toEqual({ props: 'teste' });
  });
});
