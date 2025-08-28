import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksService } from './services/tasks.service';
import { SubtasksService } from './services/subtasks.service';
import { Task } from './models/task.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TasksByDate } from './models/taskByDate.model';
import { NewTaskComponent } from './components/new-task/new-task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FilterComponent, TaskListComponent, NewTaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  //empty tasks array will be populated as soon as page initiates
  //decalre empty list as we will need it when we convert dictionary to a list
  tasks: any[] = [];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    //on page load, subscribe to all tasks and populate the tasks array
    this.tasksService.getAllTasks().subscribe({
      next: (res: any) => {
        //given that the dictionary is not an interable object, we convert it to a list
        this.tasks = Object.entries(res.tasks).map(([date, taskList]) => ({
          date,
          tasks: taskList,
        }));

        console.table('Converted list:', this.tasks);
      },
      error: (err: Error) => {
        console.error('Error fetching tasks, ', err);
      },
    });
  }

  //when filters are applied, the tasks are retrieved from backend and reordered!
  onFilterChanged(filters: any) {
    console.log('filters received', filters);

    //get tasks whithin given range!
    this.tasksService
      .getAllTasks(filters.startDate, filters.endDate)
      .subscribe({
        next: (res: any) => {
          //given that the dictionary is not an interable object, we convert it to a list
          this.tasks = Object.entries(res.tasks).map(([date, taskList]) => ({
            date,
            tasks: taskList,
          }));

          console.log('tasks before arranged!: ', this.tasks);

          //sort based on filters
          this.tasks.forEach((day) => {
            day.tasks.sort((a: Task, b: Task) => {
              // priorty sorting
              //assign each priority a number and sort using those numbers
              if (filters.priorityOptions) {
                const priorityOrder =
                  filters.priorityOptions === 'highToLow'
                    ? { high: 3, medium: 2, low: 1 }
                    : { high: 1, medium: 2, low: 3 };
                const priorityDiff =
                  priorityOrder[b.priority] - priorityOrder[a.priority];
                if (priorityDiff !== 0) return priorityDiff;
              }

              return 0;
            });
          });

          console.log('tasks afer being sorted', this.tasks);
        },
        error: (err: Error) => {
          console.error('Error fetching tasks, ', err);
        },
      });
  }

  //when task is added, reload the tasks again to update them!
  //this approach can be intensive - not very effecient
  onTaskAddition() {
    console.log('tasks reloading request');
    //reload tasks list
    this.tasksService.getAllTasks().subscribe({
      next: (res: any) => {
        //given that the dictionary is not an interable object, we convert it to a list
        this.tasks = Object.entries(res.tasks).map(([date, taskList]) => ({
          date,
          tasks: taskList,
        }));
      },
      error: (err: Error) => {
        console.error('Error fetching tasks, ', err);
      },
    });
  }
}
