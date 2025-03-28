import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/tms/login';

  constructor(private http: HttpClient) {}

  loginUser(loginData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, loginData);
  }
}
