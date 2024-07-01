export interface FindManyGoalsRepo {
  // TODO: Change from any to GoalModel
  execute: (userId: string) => Promise<any[]>;
}
