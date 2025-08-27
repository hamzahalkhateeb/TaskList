import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksService } from './services/tasks.service';
import { SubtasksService } from './services/subtasks.service';
import {Task} from './models/task.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, FilterComponent, TaskListComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  //empty tasks array will be populated as soon as page initiates
  tasks: Task[] = [];

  //filtered tasks will contain tasks that fit the filter criteria
  filteredTasks: Task[] = [];
  
  
  constructor(private tasksService: TasksService) {}

  
  ngOnInit(): void {
    //on page load, subscribe to all tasks and populate the tasks array
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
  onFilterChanged(filters: any){
    console.log("filters received", filters);
  }


}
