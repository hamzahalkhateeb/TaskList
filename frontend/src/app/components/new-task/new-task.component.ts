import { Subtask } from './../../models/subtask.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  //output to let parent component to reload tasks list
  @Output() reloadTasks = new EventEmitter<void>();

  //declare empty object to hold inout data
  taskForm: FormGroup;
  // the maximum number of subtasks a task can have!
  maxSubtask = 5;

  //subtask id counter
  private subtaskIdCounter = 1;

  constructor(private fb: FormBuilder, private tasksService: TasksService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', Validators.maxLength(100)],
      priority: [
        '',
        [Validators.required, Validators.pattern(/^(low|medium|high)$/)],
      ],
      dueDate: ['', Validators.required],
      subtasks: this.fb.array([]),
    });
  }

  //gets subtasks from input in the form of an array
  get subtasks(): FormArray {
    return this.taskForm.get('subtasks') as FormArray;
  }

  //increment subtask id to make sure each task has a unique id and is not completed by default!
  createSubtaskControl(title: string = ''): FormGroup {
    return this.fb.group({
      id: [this.subtaskIdCounter++],
      title: [title, Validators.required],
      isCompleted: [false],
    });
  }

  //adds subtasks list to the task object
  addSubtasksDiv() {
    if (this.subtasks.length < this.maxSubtask) {
      this.subtasks.push(this.createSubtaskControl());
    }
  }

  //submit task
  //and ask parent component to reload tasks list
  submitForm() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const formValue = this.taskForm.value;
    console.log(formValue);

    this.tasksService.createTask(formValue).subscribe({
      next: () => {
        console.log('about to emit');
        this.reloadTasks.emit();
        console.log('emitted');
      },
      error: (err: Error) => {
        console.error('Error completing task, ', err);
      },
    });
  }

  //reload tasks when task is added
}
