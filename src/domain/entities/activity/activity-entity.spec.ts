import { ActivityProps, ActivityType, Categories, WeekDays } from '@/domain/entities/activity/types';
import { ActivityEntity } from './activity-entity';

const now = new Date();
const futureDate = new Date(now);
futureDate.setDate(now.getDate() + 10);

const activityData: ActivityProps = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  customerId: '550e8400-e29b-41d4-a716-446655440000',
  title: 'Activity',
  description: 'Activity description',
  executeDateTime: futureDate,
  type: ActivityType.task,
  category: Categories.leisure,
  weeklyFrequency: {
    quantityPerWeek: 2,
    finallyDate: futureDate,
    weekDays: [WeekDays.monday],
  },
};

describe('Activity Entity', () => {
  it('Should correct instance of Activity', () => {
    const activity = ActivityEntity.create(activityData);
    expect(activity.isRight()).toBeTruthy();
    expect(activity.value).toBeInstanceOf(ActivityEntity);

    const { id, customerId, title, description, executeDateTime, type, category, weeklyFrequency } =
      activity.value as ActivityEntity;
    expect(id).toEqual(activityData.id);
    expect(customerId).toEqual(activityData.customerId);
    expect(title).toEqual(activityData.title);
    expect(description).toEqual(activityData.description);
    expect(executeDateTime).toEqual(activityData.executeDateTime);
    expect(type).toEqual(activityData.type);
    expect(category).toEqual(activityData.category);
    expect(weeklyFrequency).toEqual(activityData.weeklyFrequency);
  });
});
