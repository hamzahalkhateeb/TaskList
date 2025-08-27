import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {

  //declare empty object to hold inout data
  taskForm: FormGroup;
  maxSubtask = 5;

  constructor(private fb: FormBuilder){
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', Validators.maxLength(100)],
      priority:['', [Validators.required, Validators.pattern(/^(low|medium|high)$/)]],
      dueDate: ['', Validators.required],
      subtasks: this.fb.array([])
    });
  }

  get subtasks(): FormArray{
    return this.taskForm.get('subtasks') as FormArray;
  }

  addSubtasksDiv(){
    if(this.subtasks.length < this.maxSubtask){
      this.subtasks.push(this.fb.control('', Validators.required));
    }
  }


  //submit task
  submitForm(){
    if (this.taskForm.invalid){
      this.taskForm.markAllAsTouched();  
      return; 
    }

    
  
    const formValue = this.taskForm.value;
    console.log('Task payload:', formValue);
      
  } 

  
}
