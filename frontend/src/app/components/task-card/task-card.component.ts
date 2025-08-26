import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subtask } from '../../models/subtask.model';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() subtasks: Subtask[] = [];

}
