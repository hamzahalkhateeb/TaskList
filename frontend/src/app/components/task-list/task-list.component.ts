
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subtask } from '../../models/subtask.model';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];

  today = new Date();



  openTask(id:number){
    console.log("open task clicked, ", id);
    const idString = id.toString();
    const div = document.getElementById(idString);
    
    if (!div) return;

    const isHidden = getComputedStyle(div).display === "none";
    div.style.display = isHidden ? "flex" : "none";
  }


}
