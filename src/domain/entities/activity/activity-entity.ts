import { ActivityEntityProps, ActivityProps, ResponseEntityActivity } from '@/domain/entities/activity/types';
import { ActivityType, Datetime, Description, Title } from '@/domain/entities/activity/value-objects';
import { Id } from '@/domain/shared/value-objects/id/id-value-object';
import { left, right } from '@/shared/either';

export class ActivityEntity {
  private constructor(private props: ActivityEntityProps) {
    Object.freeze(this);
  }

  get id(): string {
    return this.props.id.value;
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

  static create(props: ActivityProps): ResponseEntityActivity {
    const idOrError = Id.create(props.id);
    const titleOrError = Title.create(props.title);
    const descriptionOrError = Description.create(props.description);
    const executeDateTimeOrError = Datetime.create(props.executeDateTime);
    const typeOrError = ActivityType.create(props.type);

    const results = [idOrError, titleOrError, descriptionOrError, executeDateTimeOrError, typeOrError];

    for (const result of results) {
      if (result.isLeft()) {
        return left(result.value);
      }
    }

    return right(
      new ActivityEntity({
        id: idOrError.value as Id,
        title: titleOrError.value as Title,
        description: descriptionOrError.value as Description,
        executeDateTime: executeDateTimeOrError.value as Datetime,
        type: typeOrError.value as ActivityType,
      }),
    );
  }
}
