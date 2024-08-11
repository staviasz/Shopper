import { ActivityEntity } from '@/domain/entities/activity/activity-entity';
import { FieldIsRequired } from '@/domain/shared/errors';
import { Either } from '@/shared/either';

type ActivityErrors = FieldIsRequired;

export type ResponseEntityActivity = Either<ActivityErrors, ActivityEntity>;
