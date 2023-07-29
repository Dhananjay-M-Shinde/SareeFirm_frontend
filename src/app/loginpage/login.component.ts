import { Component } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: UserDataService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      // Handle the login logic here, e.g., call an authentication service
      // For this example, we're simply logging the form value
      
      // console.log('Login Form Submitted:', this.loginForm.value);

    const dataToSend = this.loginForm.value;
    this.dataService.postData(dataToSend).subscribe(
      (response) => {
        console.log('Data sent successfully:', response);
      },
      (error) => {
        console.error('Error sending data:', error);
      }
    );
    }
  }

}
