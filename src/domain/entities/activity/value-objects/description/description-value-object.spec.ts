import { InvalidFormatDescription } from '@/domain/entities/activity/errors';
import { FieldIsRequired } from '@/domain/shared/errors';
import { Description } from './description-value-object';

describe('Description Value Objects', () => {
  it('Should return error if description is empty', () => {
    const description = Description.create('');
    expect(description.isLeft()).toBeTruthy();
    expect(description.isRight()).toBeFalsy();
    expect(description.value).toEqual(new FieldIsRequired('Descrição'));
  });

  it('Should return error if description has less than 10 characters or more than 500', () => {
    let description = Description.create('ab');
    expect(description.isLeft()).toBeTruthy();
    expect(description.isRight()).toBeFalsy();
    expect(description.value).toEqual(new InvalidFormatDescription());

    description = Description.create('a'.repeat(501));
    expect(description.isLeft()).toBeTruthy();
    expect(description.isRight()).toBeFalsy();
    expect(description.value).toEqual(new InvalidFormatDescription());
  });
});
