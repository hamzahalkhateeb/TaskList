
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subtask } from '../../models/subtask.model';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { SubtasksService } from '../../services/subtasks.service';
import { TasksByDate } from './../../models/taskByDate.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() tasks: TasksByDate[] = [];

  constructor(private tasksService: TasksService, private subtaskService: SubtasksService) {}

  today = new Date();



  openTask(id:number){
    console.log("open task clicked, ", id);
    const idString = id.toString();
    const div = document.getElementById(idString);
    
    if (!div) return;

    const isHidden = getComputedStyle(div).display === "none";
    div.style.display = isHidden ? "flex" : "none";
  }

  
  completeTask(id: number){

    this.tasksService.completeTask(id).subscribe({
      next: () =>{

        //iterate over each day
        for (let group of this.tasks) {
          // find the task in this group's task array
          const task = group.tasks.find(t => t.id === id);
          if (task) {
            task.isCompleted = true;
            break; 
          }
        }
      },
      error: (err: Error) =>{
        console.error('Error completing task, ', err);
      }
    });
    

  }

  deleteTask(id: number){
     this.tasksService.deleteTask(id).subscribe({
      next: () =>{
        for (let group of this.tasks) {
        const index = group.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
          group.tasks.splice(index, 1);
          break; // stop after removing the task
        }
      }
      },
      error: (err: Error) =>{
        console.error('Error fetching tasks, ', err);
      }
    });

  }

  completeSubtask(taskId: number, subId: number){
    this.subtaskService.completeSubtask(taskId, subId).subscribe({
      next: () =>{
        for (let group of this.tasks) {
        const task = group.tasks.find(t => t.id === taskId);
        if (task) {
          const subtaskCount = task.subtasks.length;
          const progressIncrease = 100/subtaskCount;
          const subtask = task.subtasks.find(s => s.id === subId);
          if (subtask) {
            subtask.isCompleted = true;
            task.progress += progressIncrease;
            break; // stop once we found the subtask
          }
        }
      }
      },
      error: (err: Error) =>{
        console.error('Error completing subtask, ', err);
      }
    });
  }

  showSubtasks(id:number){
    const divId = `subtaskDiv-` + id.toString();
    
    const div = document.getElementById(divId);
    
    if (!div) return;

    const isHidden = getComputedStyle(div).display === "none";
    div.style.display = isHidden ? "flex" : "none";
  }


}
