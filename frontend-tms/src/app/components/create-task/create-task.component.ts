import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  standalone: false,
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  taskForm: FormGroup;
  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log("Task Created: ", this.taskForm.value);
      this.taskService.createTask(this.taskForm.value).subscribe(() => {
        alert('Task Created Successfully!');
        this.router.navigate(['/home']);
      });
    }
  }
}
