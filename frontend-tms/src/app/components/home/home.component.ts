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

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.getAllTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  // deleteTask(id: number) {
  //   if (id === undefined) {
  //     console.error('Task ID is undefined, cannot delete task.');
  //     return;
  //   }
  //   if (confirm('Are you sure you want to delete this task?')) {
  //     this.taskService.deleteTask(id).subscribe(() => {
  //       this.tasks = this.tasks.filter(task => task.id !== id); // Update UI after deletion
  //       alert('Task deleted successfully!');
  //     });
  //   }
  // }
}
