import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subtask } from '../../models/subtask.model';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { SubtasksService } from '../../services/subtasks.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];

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
        const task = this.tasks.find(t=> t.id === id);
        if(task){
          task.isCompleted = true;
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
        const task = this.tasks.find(t=> t.id === id);
        if(task){
          const index = this.tasks.findIndex(task => task.id === id);
          if(index !== -1){
            this.tasks.splice(index, 1);
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
        const task = this.tasks.find(t=> t.id === taskId);
        if(task){
          const subtask = task.subtasks.find(s=> s.id === subId);
          if(subtask){
            subtask.isCompleted = true;
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
