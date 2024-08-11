import { InvalidFormatTitle } from '@/domain/entities/activity/errors';
import { FieldIsRequired } from '@/domain/shared/errors';
import { Title } from './title-value-object';

describe('Title Value Objects', () => {
  it('Should return error if title is empty', () => {
    const title = Title.create('');
    expect(title.isLeft()).toBeTruthy();
    expect(title.isRight()).toBeFalsy();
    expect(title.value).toBeInstanceOf(FieldIsRequired);
  });

  it('Should return error if title has less than 3 characters or more than 50', () => {
    let title = Title.create('ab');
    expect(title.isLeft()).toBeTruthy();
    expect(title.isRight()).toBeFalsy();
    expect(title.value).toBeInstanceOf(InvalidFormatTitle);

    title = Title.create('a'.repeat(51));
    expect(title.isLeft()).toBeTruthy();
    expect(title.isRight()).toBeFalsy();
    expect(title.value).toBeInstanceOf(InvalidFormatTitle);
  });
});
