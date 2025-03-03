import { Task } from "./task";

export type Bot = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  tasks: Task[];
};