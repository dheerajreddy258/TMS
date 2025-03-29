// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TaskService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  priority: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/tms/tasks'; // Backend API URL

  constructor(private http: HttpClient) {}

  // createTask(task: Task): Observable<Task> {
  //   return this.http.post<Task>(`${this.apiUrl}/create`, task);
  // }

  // getAllTasks(): Observable<Task[]> {
  //   return this.http.get<Task[]>(`${this.apiUrl}/all`);
  // }

  // getTaskById(id: number): Observable<Task> {
  //   return this.http.get<Task>(`${this.apiUrl}/${id}`);
  // }

  // updateTask(id: number, task: Task): Observable<Task> {
  //   return this.http.put<Task>(`${this.apiUrl}/update/${id}`, task);
  // }

  // deleteTask(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  // }

  createTask(task: Task, userId: number): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/create?userId=${userId}`, task);
  }
  getUserTasks(userId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/user/${userId}`);
  }
  
  
  
  updateTask(id: number, task: Task, userId: number): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/update/${id}?userId=${userId}`, task);
  }
  
  deleteTask(id: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}?userId=${userId}`);
  }
  
}
