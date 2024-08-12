import {
  ActivityEntityType,
  ActivityType,
  ResponseEntityActivityType,
  WeeklyFrequencyType,
} from '@/domain/entities/activity/types';
import {
  ActivityTypeValueObject,
  CategoryValueObject,
  DatetimeValueObject,
  DescriptionValueObject,
  TitleValueObject,
  WeeklyFrequencyValueObject,
} from '@/domain/entities/activity/value-objects';
import { IdValueObject } from '@/domain/shared/value-objects/id/id-value-object';
import { left, right } from '@/shared/either';

export class ActivityEntity {
  private constructor(private props: ActivityEntityType) {
    Object.freeze(this);
  }

  get id(): string {
    return this.props.id.value;
  }

  get customerId(): string {
    return this.props.customerId.value;
  }

  get title(): string {
    return this.props.title.value;
  }

  get description(): string {
    return this.props.description.value;
  }

  get executeDateTime(): Date {
    return this.props.executeDateTime.value;
  }

  get type(): string {
    return this.props.type.value;
  }

  get category(): string {
    return this.props.category.value;
  }

  get weeklyFrequency(): WeeklyFrequencyType | undefined {
    return this.props.weeklyFrequency?.value;
  }

  static create(props: ActivityType): ResponseEntityActivityType {
    const { id, customerId, title, description, executeDateTime, type, category, weeklyFrequency } = props;

    const idOrError = IdValueObject.create(id);
    const customerIdOrError = IdValueObject.create(customerId);
    const titleOrError = TitleValueObject.create(title);
    const descriptionOrError = DescriptionValueObject.create(description);
    const executeDateTimeOrError = DatetimeValueObject.create(executeDateTime);
    const categoryOrError = CategoryValueObject.create(category);
    const typeOrError = ActivityTypeValueObject.create(type);

    const results = [
      idOrError,
      customerIdOrError,
      titleOrError,
      descriptionOrError,
      executeDateTimeOrError,
      typeOrError,
      categoryOrError,
    ];

    const weeklyFrequencyOrError = weeklyFrequency && WeeklyFrequencyValueObject.create(weeklyFrequency);
    weeklyFrequencyOrError && results.push(weeklyFrequencyOrError as any); // typed with any to avoid putting all types in the array

    for (const result of results) {
      if (result.isLeft()) {
        return left(result.value);
      }
    }

    return right(
      new ActivityEntity({
        id: idOrError.value as IdValueObject,
        customerId: customerIdOrError.value as IdValueObject,
        title: titleOrError.value as TitleValueObject,
        description: descriptionOrError.value as DescriptionValueObject,
        executeDateTime: executeDateTimeOrError.value as DatetimeValueObject,
        type: typeOrError.value as ActivityTypeValueObject,
        category: categoryOrError.value as CategoryValueObject,
        weeklyFrequency: weeklyFrequencyOrError?.value as WeeklyFrequencyValueObject,
      }),
    );
  }
}
