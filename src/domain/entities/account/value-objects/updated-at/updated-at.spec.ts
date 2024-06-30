import { UpdatedAt } from './updated-at';

/**
 * @group domain
 * @group models
 * @group models/user
 */
describe('UpdatedAt ValueObject', () => {
  it('Should return CreatedAt on success', () => {
    const newDate = new Date();
    const sut = UpdatedAt.create(newDate);
    expect(sut.value).toEqual({ props: newDate });
  });
});
