import { Component } from '@angular/core';
import { BranchDataService } from '../services/branch-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent {

  branchData: any[] = [];
  registrationForm!: FormGroup;
  showOtp: boolean = false;
  otpEntered: boolean = false;
  showModal:boolean = false;
  otpSent:boolean = false;
  resend:boolean = true;
  successMsg = '';
  errorMsg = '';
  newBranch: any = {};

  constructor(private branchService: BranchDataService, private formBuilder:FormBuilder){}

  ngOnInit() {
    this.getBranchData();
    this.registrationForm = this.formBuilder.group({
      branchId: ['', Validators.required],
      branchName: ['', Validators.required],
      ownerName: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      otp: ['']})
  }

  getBranchData(){
    console.log("into .ts");
    
    this.branchService.getBranchData().subscribe((response) =>{
      console.log(response);
      
      this.branchData = response;
      console.log(this.branchData);
      
    })
  }

  registerModel(){
    this.showModal = true;
  }

  sendOtp() {
    this.newBranch = {
      Branch_Id: this.registrationForm.get('branchId')?.value,
      Branch_name: this.registrationForm.get('BranchName')?.value,
      Owner_name: this.registrationForm.get('ownerName')?.value,
      Contact: this.registrationForm.get('contact')?.value,
      Address: this.registrationForm.get('address')?.value,
      Email: this.registrationForm.get('email')?.value,
      Password: this.registrationForm.get('password')?.value
    };

    // Simulate OTP sending logic here
    // let otp = this.registrationForm.get('otp')?.value;
    this.otpSent = true;
    this.resend = false;
    this.showOtp = true;
    this.branchService.sendOtp(this.newBranch).subscribe((Response) =>{
      console.log("otp sent to backend");
    }, (error) =>{
      console.log("otp can't send");
    })
  }

  onSubmit() {
    if (this.showOtp && this.registrationForm.get('otp')?.value) {
      this.otpEntered = true;
    }
    
    if (this.otpEntered && this.registrationForm.valid) {
      // Register user logic here
      console.log('User registered:', this.registrationForm.value);
    }
  }

  otpValid(){
    console.log("into validation");
    
    if(this.registrationForm.get('otp')?.value.toString().length == 6){
      console.log("check 6 digit");
      
      this.otpEntered = true;
    }
    else{
      this.otpEntered = false;
      console.log("not check 6 digit");
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  register(){

    this.newBranch = {
      Branch_Id: this.registrationForm.get('branchId')?.value,
      Branch_name: this.registrationForm.get('BranchName')?.value,
      Owner_name: this.registrationForm.get('ownerName')?.value,
      Contact: this.registrationForm.get('contact')?.value,
      Address: this.registrationForm.get('address')?.value,
      Email: this.registrationForm.get('email')?.value,
      Password: this.registrationForm.get('password')?.value
    };
    console.log("into registration");
    
    console.log(this.newBranch);
    console.log("after registration");
    
    let otp = this.registrationForm.get('otp')?.value;
    this.branchService.addNewBranch(otp, this.newBranch).subscribe((response) =>{
      this.successMsg = "registration successful";
      this.errorMsg = '';
      setTimeout(() => {
        this.closeModal();
      }, 2000);
    }, (error) =>{
      this.errorMsg = "Registration unsuccessful";
      this.successMsg = '';
    })
  }

}
