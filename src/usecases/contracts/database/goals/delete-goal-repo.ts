export interface DeleteGoalRepo {
  execute: (goalId: string) => Promise<void>;
}
