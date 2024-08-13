import { ActivityEntity } from '@/domain/entities/activity/activity-entity';
import { FieldIsRequiredError } from '@/domain/shared/errors';
import { Either } from '@/shared/either';

type ActivityErrorsType = FieldIsRequiredError;

export type ResponseEntityActivityType = Either<ActivityErrorsType, ActivityEntity>;
