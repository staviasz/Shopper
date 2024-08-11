import { ActivityEntity } from './activity-entity';

const activityData = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  title: 'Activity',
  description: 'Activity description',
};

describe('Activity Entity', () => {
  it('Should correct instance of Activity', () => {
    const activity = ActivityEntity.create(activityData);
    expect(activity.isRight()).toBeTruthy();
    expect(activity.value).toBeInstanceOf(ActivityEntity);

    const { id, title, description } = activity.value as ActivityEntity;
    expect(id).toEqual(activityData.id);
    expect(title).toEqual(activityData.title);
    expect(description).toEqual(activityData.description);
  });
});
