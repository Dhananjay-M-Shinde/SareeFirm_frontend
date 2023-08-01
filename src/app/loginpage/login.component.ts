import { Component } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { faUserCircle, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
// import { faFontAwesome } from '@fortawesome/free-brands-svg-icons';
// import { bus } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm!: FormGroup;
  fa = faUserCircle;
  faLock = faLock;
  faUserCircle = faUserCircle;

  constructor(private formBuilder: FormBuilder, private dataService: UserDataService, private router:Router) {}

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
      console.log("into login");
      
    const dataToSend = this.loginForm.value;
    this.dataService.postData(dataToSend).subscribe(
      (response) => {
        console.log("success");
        
        this.handleLoginResponse(response);

        console.log('Data sent successfully:', response);
        if(response.status == 201){
          this.router.navigate(['/branchInventory']);
        }
        
      },
      (error) => {
        console.error('Error sending data:', error);
      }
    );
    }
  }

  // function to store jwt token in localstorage
  handleLoginResponse(response: any) {
    // Assuming the response contains the JWT token in a property called 'token'
    console.log("inside hjandllelogin");
    
    const token = response.data;
    console.log(token, " this is  token");
    
    // Save the token to Local Storage
    localStorage.setItem('token', token);
    // console.log("retrieving from localstorage ", localStorage.getItem('token'));
    
  }

}
