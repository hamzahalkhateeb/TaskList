import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksService } from './services/tasks.service';
import { SubtasksService } from './services/subtasks.service';
import {Task} from './models/task.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  //empty tasks array will be populated as soon as page initiates
  tasks: Task[] = [];

  //filtered tasks will contain tasks that fit the filter criteria
  filteredTasks: Task[] = [];
  
  
  constructor(private tasksService: TasksService) {}

  //on page load, subscribe to all tasks
  ngOnInit(): void {
    this.tasksService.getAllTasks().subscribe({
      next: (tasks: Task[]) =>{
        this.tasks = tasks;
        console.log(this.tasks);
      },
      error: (err: Error) =>{
        console.error('Error fetching tasks, ', err);
      }
    });

    
  }

  //declare functions


}
