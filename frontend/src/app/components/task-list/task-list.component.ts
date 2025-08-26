import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subtask } from '../../models/subtask.model';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];


}
