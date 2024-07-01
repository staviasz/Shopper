export interface FindOneGoalRepo {
  execute: (goalId: string) => Promise<any>;
}
