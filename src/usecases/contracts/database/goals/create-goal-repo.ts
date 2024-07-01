export interface CreateGoalRepo {
  // TODO: Change from any to GoalModel
  execute: (userId: string, data: any) => Promise<void>;
}
