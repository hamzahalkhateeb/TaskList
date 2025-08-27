import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, of } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  //needed variables
  private apiUrl = 'http://localhost:3000'; //Backend API URL

  //constructor
  constructor(private http: HttpClient) {}

  //get all tasks, take a time frame as optional parameter
  getAllTasks(fromDate?: string, toDate?: string):Observable<Task[]> {

    /*const mockTasks: Task[]= [
      {
        id: 1,
        title: "Task 1",
        description: "Description for Task 1",
        dueDate: new Date("2025-08-25"),
        priority: "high",
        isCompleted: false,
        progress: 40,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: false },
          { id: 3, title: "Subtask 3", isCompleted: false },
          { id: 4, title: "Subtask 4", isCompleted: false },
          { id: 5, title: "Subtask 5", isCompleted: false },
        ],
      },
      {
        id: 2,
        title: "Task 2",
        description: "Description for Task 2",
        dueDate: new Date("2025-08-28"),
        priority: "medium",
        isCompleted: false,
        progress: 60,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: true },
          { id: 3, title: "Subtask 3", isCompleted: false },
        ],
      },
      {
        id: 3,
        title: "Task 3",
        description: "Description for Task 3",
        dueDate: new Date("2025-08-29"),
        priority: "low",
        isCompleted: false,
        progress: 33,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: false },
          { id: 3, title: "Subtask 3", isCompleted: false },
        ],
      },
      {
        id: 4,
        title: "Task 4",
        description: "Description for Task 4",
        dueDate: new Date("2025-08-30"),
        priority: "high",
        isCompleted: false,
        progress: 50,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: false },
        ],
      },
      {
        id: 5,
        title: "Task 5",
        description: "Description for Task 5",
        dueDate: new Date("2025-09-01"),
        priority: "medium",
        isCompleted: true,
        progress: 100,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: true },
          { id: 3, title: "Subtask 3", isCompleted: true },
        ],
      },
      {
        id: 6,
        title: "Task 6",
        description: "Description for Task 6",
        dueDate: new Date("2025-09-02"),
        priority: "low",
        isCompleted: false,
        progress: 25,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: false },
          { id: 3, title: "Subtask 3", isCompleted: false },
          { id: 4, title: "Subtask 4", isCompleted: false },
        ],
      },
      {
        id: 7,
        title: "Task 7",
        description: "Description for Task 7",
        dueDate: new Date("2025-09-03"),
        priority: "high",
        isCompleted: false,
        progress: 20,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: false },
          { id: 3, title: "Subtask 3", isCompleted: false },
          { id: 4, title: "Subtask 4", isCompleted: false },
          { id: 5, title: "Subtask 5", isCompleted: false },
        ],
      },
      {
        id: 8,
        title: "Task 8",
        description: "Description for Task 8",
        dueDate: new Date("2025-09-04"),
        priority: "medium",
        isCompleted: false,
        progress: 50,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: false },
        ],
      },
      {
        id: 9,
        title: "Task 9",
        description: "Description for Task 9",
        dueDate: new Date("2025-09-05"),
        priority: "low",
        isCompleted: false,
        progress: 33,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: false },
          { id: 3, title: "Subtask 3", isCompleted: false },
        ],
      },
      {
        id: 10,
        title: "Task 10",
        description: "Description for Task 10",
        dueDate: new Date("2025-09-06"),
        priority: "high",
        isCompleted: false,
        progress: 75,
        subtasks: [
          { id: 1, title: "Subtask 1", isCompleted: true },
          { id: 2, title: "Subtask 2", isCompleted: true },
          { id: 3, title: "Subtask 3", isCompleted: true },
          { id: 4, title: "Subtask 4", isCompleted: false },
        ],
      },
    ];

    return of(mockTasks); */

    
    //get current date
    const now = new Date();
    

    //if no time frame is provided, get tasks for today and tomorrow only
    const from =
      fromDate ||
      new Date(new Date(now).setDate(now.getDate())).toISOString();

    const to =
      toDate ||
      new Date(new Date(now).setDate(now.getDate() + 1)).toISOString();

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
    return this.http.patch<Task>(`${this.apiUrl}/tasks/${taskId}`, updatedTask).pipe(
      catchError((error) => {
        console.error('Error updating task', error);
        return of();
      }));
  }


  //complete a task by id
  completeTask(taskId: number): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/tasks/${taskId}/complete`, {}).pipe(
      catchError((error) => {
        console.error('Error completing task', error);
        return of();
      })
    );
  }
  
  
  


}
