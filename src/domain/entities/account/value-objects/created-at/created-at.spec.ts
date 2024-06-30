import { CreatedAt } from './created-at';
CreatedAt;

/**
 * @group domain
 * @group models
 * @group models/user
 */
describe('CreatedAt ValueObject', () => {
  it('Should return CreatedAt on success', () => {
    const newDate = new Date();
    console.log(newDate);
    const sut = CreatedAt.create(newDate);
    expect(sut.value).toEqual({ props: newDate });
  });
});
