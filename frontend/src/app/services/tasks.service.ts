import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, of } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  //needed variables
  private apiUrl = 'http://localhost:5245'; //Backend API URL --  this would normally be in an env file!

  //constructor
  constructor(private http: HttpClient) {}

  //get all tasks, take a time frame as optional parameter
  getAllTasks(fromDate?: string, toDate?: string): Observable<Task[]> {
    //get current date
    const now = new Date();

    //if no time frame is provided, get tasks for today and tomorrow only
    const from = fromDate || now.toISOString().split('T')[0];

    const to =
      toDate ||
      new Date(new Date(now).setDate(now.getDate() + 1))
        .toISOString()
        .split('T')[0];

    // Fetch tasks within the given or default time frame
    return this.http
      .get<Task[]>(`${this.apiUrl}/tasks?from=${from}&to=${to}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching tasks', error);
          return of([]);
        })
      );
  }

  //delete a task by task id
  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${taskId}`).pipe(
      catchError((error) => {
        console.error('Error deleting task', error);
        return of();
      })
    );
  }

  //create a new task
  createTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task).pipe(
      catchError((error) => {
        console.error('Error creating task', error);
        return of();
      })
    );
  }

  //update a task by task id
  updateTask(taskId: number, updatedTask: Partial<Task>): Observable<Task> {
    return this.http
      .patch<Task>(`${this.apiUrl}/tasks/${taskId}`, updatedTask)
      .pipe(
        catchError((error) => {
          console.error('Error updating task', error);
          return of();
        })
      );
  }

  //complete a task by id
  completeTask(taskId: number): Observable<Task> {
    return this.http
      .patch<Task>(
        `${this.apiUrl}/tasks/${taskId}/complete?taskId=${taskId}`,
        {}
      )
      .pipe(
        catchError((error) => {
          console.error('Error completing task', error);
          return of();
        })
      );
  }
}
