import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginData = {
    email: '',
    password: ''
  };

  constructor(private loginService: LoginService, private router: Router) {}

  // onSubmit() {
  //   this.loginService.login(this.loginData).subscribe(
  //     (response: any) => {
  //       alert(response.message); // Show success message
  //       console.log("HIII")
  //       this.router.navigate(['/home']); // Navigate to home page
  //     },
  //     (error) => {
  //       console.log(error);
  //       alert(error.error.message || 'Login failed!');
  //     }
  //   );
  // }
  onSubmit() {
    this.loginService.login(this.loginData).subscribe(
      (response: any) => {
        alert('Login successful!'); // Show success message
        this.router.navigate(['/home']); // Navigate to home page
      },
      (error: any) => { // Explicitly declare 'error' type
        console.error('Login error:', error);
        alert(error.error?.message || 'Login failed!');
      }
    );
  }

}

