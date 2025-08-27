import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, of } from 'rxjs';
import { Task } from '../models/task.model';
import { Subtask } from '../models/subtask.model';

@Injectable({
  providedIn: 'root',
})
export class SubtasksService {
  private backendUrl = 'http://localhost:5245';

  constructor(private http: HttpClient) {}

  //add subtask to a task by task id
  addSubtask(taskId: number, subtask: Partial<Subtask>): Observable<Subtask> {
    return this.http
      .post<Subtask>(`${this.backendUrl}/tasks/${taskId}/subtasks`, subtask)
      .pipe(
        catchError((error) => {
          console.error('Error adding subtask', error);
          return of();
        })
      );
  }

  //complete subtask by subtask id and task id
  completeSubtask(taskId: number, subtaskId: number): Observable<Subtask> {
    return this.http
      .patch<Subtask>(
        `${this.backendUrl}/tasks/${taskId}/subtasks/${subtaskId}/complete`,
        {}
      )
      .pipe(
        catchError((error) => {
          console.error('Error completing subtask', error);
          return of();
        })
      );
  }

  //delete subtask by subtask id and task id
  deleteSubtask(taskId: number, subtaskId: number): Observable<void> {
    return this.http
      .delete<void>(`${this.backendUrl}/tasks/${taskId}/subtasks/${subtaskId}`)
      .pipe(
        catchError((error) => {
          console.error('Error deleting subtask', error);
          return of();
        })
      );
  }
}
