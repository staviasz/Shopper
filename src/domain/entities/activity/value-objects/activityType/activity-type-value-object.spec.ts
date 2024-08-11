import { ActivityType as TypeActivity } from '@/domain/entities/activity/types';
import { FieldIsRequired, InvalidFieldsValues } from '@/domain/shared/errors';
import { ActivityType } from './activity-type-value-object';

const KeysTypeActivity = Object.values(TypeActivity);

describe('Activity Value Object', () => {
  it('Should return error if received empty value', () => {
    const activity = ActivityType.create('' as any);
    expect(activity.isLeft()).toBeTruthy();
    expect(activity.isRight()).toBeFalsy();
    expect(activity.value).toEqual(new FieldIsRequired('Type'));
  });

  it('Should return error if received invalid value', () => {
    const activity = ActivityType.create('test' as any);
    expect(activity.isLeft()).toBeTruthy();
    expect(activity.isRight()).toBeFalsy();
    expect(activity.value).toEqual(new InvalidFieldsValues('Type', KeysTypeActivity));
  });

  it('Should correct activity type', () => {
    const activity = ActivityType.create(TypeActivity.task);
    expect(activity.isLeft()).toBeFalsy();
    expect(activity.isRight()).toBeTruthy();
    expect(activity.value).toEqual({ props: TypeActivity.task });
  });
});
