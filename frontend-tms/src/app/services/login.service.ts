import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/tms/login';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${this.baseUrl}`, credentials).pipe(
      tap(response => {
        if (response && response.userId && response.token) {
          localStorage.setItem('userId', response.userId.toString());
          localStorage.setItem('token', response.token);
          localStorage.setItem('email', response.email || credentials.email);
        } else {
          throw new Error('Invalid response format from server');
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? +userId : null;
  }
  
}
