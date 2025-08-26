//Import subtask model as it will be used in the parent task model
import { Subtask } from "./subtask.model";


//declare task structure and export it globally
export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    priority: 'low' | 'medium' | 'high';
    isCompleted: boolean;
    subtasks: Subtask[];
    progress: number;
}



