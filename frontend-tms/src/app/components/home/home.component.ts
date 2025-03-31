// import { Component, OnInit } from '@angular/core';
// import { Task, TaskService } from '../../services/task.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   standalone: false,
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css'
// })
// export class HomeComponent implements OnInit {
//   tasks: Task[] = [];
//   userId: number | null = null;

//   constructor(private taskService: TaskService, private router: Router) {}

//   ngOnInit() {
//     this.userId = Number(localStorage.getItem('userId')); // Get userId from localStorage

//     if (this.userId) {
//       this.taskService.getUserTasks(this.userId).subscribe((tasks) => {
//         this.tasks = tasks;
//       });
//     }
//   }
  
//   deleteTask(taskId: number) {
//     const userId = Number(localStorage.getItem('userId'));
    
//     if (!userId) {
//       alert('User not logged in!');
//       return;
//     }
  
//     this.taskService.deleteTask(taskId, userId).subscribe(
//       (response) => {
//         alert('Task deleted successfully!');
//         this.tasks = this.tasks.filter(task => task.id !== taskId);
//       },
//       (error) => {
//         alert('Failed to delete task. Please try again.');
//         console.error(error);
//       }
//     );
//   }  

//   editTask(taskId: number) {
//     this.router.navigate(['/edit-task', taskId]);
//   }
  
// }
import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  userId: number | null = null;
  
  selectedStatus: string = 'all';  // Default filter for status
  selectedPriority: string = 'all'; // Default filter for priority

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.userId = Number(localStorage.getItem('userId')); // Get userId from localStorage

    if (this.userId) {
      this.taskService.getUserTasks(this.userId).subscribe((tasks) => {
        this.tasks = tasks;
        this.applyFilters(); // Apply filters initially
      });
    }
  }
  
  deleteTask(taskId: number) {
    if (!this.userId) {
      alert('User not logged in!');
      return;
    }

    this.taskService.deleteTask(taskId, this.userId).subscribe(
      () => {
        alert('Task deleted successfully!');
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.applyFilters(); // Update filtered tasks
      },
      (error) => {
        alert('Failed to delete task. Please try again.');
        console.error(error);
      }
    );
  }  

  editTask(taskId: number) {
    this.router.navigate(['/edit-task', taskId]);
  }

  // 🔹 Apply filters based on status and priority
  applyFilters() {
    this.filteredTasks = this.tasks.filter(task => {
      const statusMatch = this.selectedStatus === 'all' || task.status === this.selectedStatus;
      const priorityMatch = this.selectedPriority === 'all' || task.priority === this.selectedPriority;
      return statusMatch && priorityMatch;
    });
  }
}
