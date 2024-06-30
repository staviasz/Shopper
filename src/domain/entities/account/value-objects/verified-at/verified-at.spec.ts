import { VerifiedAt } from './verified-at';

/**
 * @group domain
 * @group models
 * @group models/user
 */
describe('VerifiedAt ValueObject', () => {
  it('Should return VerifiedAt on success', () => {
    const newDate = new Date();
    const sut = VerifiedAt.create(newDate);
    expect(sut.value).toEqual({ props: newDate });
  });
});
