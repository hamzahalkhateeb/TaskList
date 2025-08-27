import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksService } from './services/tasks.service';
import { SubtasksService } from './services/subtasks.service';
import {Task} from './models/task.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TasksByDate } from './models/taskByDate.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, FilterComponent, TaskListComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  //empty tasks array will be populated as soon as page initiates
  //dictionary of tasks grouped by date keys
  tasksByDate: TasksByDate = {};
  tasks: any[] = [];

  
  
  
  constructor(private tasksService: TasksService) {}

  
  ngOnInit(): void {
    //on page load, subscribe to all tasks and populate the tasks array
    this.tasksService.getAllTasks().subscribe({
      next: (res: any) =>{
        this.tasksByDate = res;
        console.log(this.tasksByDate);

        //given that the dictionary is not an interable object, we convert it to a list
        this.tasks = Object.entries(this.tasksByDate).map(([date, taskList]) => ({
          date,
          tasks: taskList
        }));

        console.log('Converted list:', this.tasks);
      },
      error: (err: Error) =>{
        console.error('Error fetching tasks, ', err);
      }
    });



    
  }

  //declare functions
  onFilterChanged(filters: any){
    console.log("filters received", filters);

    //make a new call for tasks that fit the filters
    //on backend, structure them differnetly
    //that's it!
  }


}
