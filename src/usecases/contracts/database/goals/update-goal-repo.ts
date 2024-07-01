export interface UpdateGoalRepo {
  // TODO: Change from any to GoalModel
  execute: (goalId: string, data: any) => Promise<void>;
}
