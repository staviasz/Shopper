import { ActivityType } from '../types';

export class InvalidActivityType extends Error {
  constructor(activities: ActivityType[]) {
    super(`O tipo da atividade deve ser: ${activities.join(', ')}`);
  }
}
