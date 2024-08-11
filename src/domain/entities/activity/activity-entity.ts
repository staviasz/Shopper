import {
  ActivityEntityProps,
  ActivityProps,
  ResponseEntityActivity,
  WeeklyFrequency as WeeklyFrequencyType,
} from '@/domain/entities/activity/types';
import {
  ActivityType,
  Category,
  Datetime,
  Description,
  Title,
  WeeklyFrequency,
} from '@/domain/entities/activity/value-objects';
import { Id } from '@/domain/shared/value-objects/id/id-value-object';
import { left, right } from '@/shared/either';

export class ActivityEntity {
  private constructor(private props: ActivityEntityProps) {
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

  static create(props: ActivityProps): ResponseEntityActivity {
    const { id, customerId, title, description, executeDateTime, type, category, weeklyFrequency } = props;

    const idOrError = Id.create(id);
    const customerIdOrError = Id.create(customerId);
    const titleOrError = Title.create(title);
    const descriptionOrError = Description.create(description);
    const executeDateTimeOrError = Datetime.create(executeDateTime);
    const typeOrError = ActivityType.create(type);
    const categoryOrError = Category.create(category);

    const results = [
      idOrError,
      customerIdOrError,
      titleOrError,
      descriptionOrError,
      executeDateTimeOrError,
      typeOrError,
      categoryOrError,
    ];

    const weeklyFrequencyOrError = weeklyFrequency ? WeeklyFrequency.create(weeklyFrequency) : undefined;
    weeklyFrequencyOrError && results.push(weeklyFrequencyOrError as any); // typed with any to avoid putting all types in the array

    for (const result of results) {
      if (result.isLeft()) {
        return left(result.value);
      }
    }

    return right(
      new ActivityEntity({
        id: idOrError.value as Id,
        customerId: customerIdOrError.value as Id,
        title: titleOrError.value as Title,
        description: descriptionOrError.value as Description,
        executeDateTime: executeDateTimeOrError.value as Datetime,
        type: typeOrError.value as ActivityType,
        category: categoryOrError.value as Category,
        weeklyFrequency: weeklyFrequencyOrError?.value as WeeklyFrequency,
      }),
    );
  }
}
