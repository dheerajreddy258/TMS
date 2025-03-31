// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { TaskService } from '../../services/task.service';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-edit-task',
//   standalone: false,
//   templateUrl: './edit-task.component.html',
//   styleUrl: './edit-task.component.css'
// })
// export class EditTaskComponent implements OnInit {
//   taskForm!: FormGroup;
//   taskId!: number;
//   userId!: number;

//   constructor(
//     private fb: FormBuilder,
//     private taskService: TaskService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.taskId = Number(this.route.snapshot.paramMap.get('id'));
//     this.userId = Number(localStorage.getItem('userId'));

//     if (!this.userId) {
//       alert('User not logged in!');
//       this.router.navigate(['/login']);
//       return;
//     }

//     // Fetch the task details
//     this.taskService.getTaskById(this.taskId, this.userId).subscribe(task => {
//       this.taskForm = this.fb.group({
//         title: [task.title, Validators.required],
//         description: [task.description, Validators.required],
//         dueDate: [task.dueDate, Validators.required],
//         status: [task.status, Validators.required],
//         priority: [task.priority, Validators.required]
//       });
//     });
//   }
  
  
//   onSubmit() {
//     if (this.taskForm.valid) {
//       this.taskService.updateTask(this.taskId, this.taskForm.value, this.userId)
//         .subscribe(() => {
//           alert('Task Updated Successfully!');
//           this.router.navigate(['/home']);
//         });
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  standalone: false,
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: number;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    public  router: Router
  ) {}

  ngOnInit() {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.userId = Number(localStorage.getItem('userId'));

    if (!this.userId) {
      alert('User not logged in!');
      this.router.navigate(['/login']);
      return;
    }

    // Initialize form with empty values
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required]
    });

    // Fetch the task details and update the form
    this.taskService.getTaskById(this.taskId, this.userId).subscribe(task => {
      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
        priority: task.priority
      });
    });
  }
  
  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.updateTask(this.taskId, this.taskForm.value, this.userId)
        .subscribe(() => {
          alert('Task Updated Successfully!');
          this.router.navigate(['/home']);
        });
    }
  }
}
