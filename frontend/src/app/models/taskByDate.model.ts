import { Task } from "./task.model";

export interface TasksByDate {
  [date: string]: Task[];
}