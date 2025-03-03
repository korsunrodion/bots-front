export enum TaskStatus {
  Pending = 'pending',
  InProgress = 'in-progress',
  Completed = 'completed'
};

export enum TaskStatusLabel {
  pending = 'Pending',
  'in-progress' = 'In progress',
  completed = 'Completed'
}

export type Task = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: TaskStatus;
  completedAt?: Date;
  name: string;
};