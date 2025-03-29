import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  userId: number | null = null;

  constructor(private taskService: TaskService) {}

  // ngOnInit() {
  //   this.fetchTasks();
  // }
  ngOnInit() {
    this.userId = Number(localStorage.getItem('userId')); // Get userId from localStorage

    if (this.userId) {
      this.taskService.getUserTasks(this.userId).subscribe((tasks) => {
        this.tasks = tasks;
      });
    }
  }
  

  // fetchTasks() {
  //   this.taskService.getAllTasks().subscribe((data) => {
  //     this.tasks = data;
  //   });
  // }

  deleteTask(id: number) {
    if (this.userId) {
      this.taskService.deleteTask(id, this.userId).subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      });
    }
  }
}
