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
  showUpdateModal: boolean = false;
  otpSent:boolean = false;
  resend:boolean = true;
  successMsg = '';
  errorMsg = '';
  successmsg = '';
  errormsg = '';
  newBranch: any = {};
  updateDetails: any = {};
  updateDetailsForm!: FormGroup;
  BranchId: number | undefined;

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
      otp: ['']
    });

    this.updateDetailsForm = this.formBuilder.group({

      Branch_name: ['', Validators.required],
      Owner_name: ['', Validators.required],
      Contact: ['', Validators.required],
      Address: ['', Validators.required],
      Email: ['', Validators.required]
    })
  }

  getBranchData(){
    this.branchService.getBranchData().subscribe((response) =>{
      this.branchData = response;
    })
  }

  registerModel(){
    this.showModal = true;
  }

  sendOtp() {
    this.newBranch = {
      Branch_Id: this.registrationForm.get('branchId')?.value,
      Branch_name: this.registrationForm.get('branchName')?.value,
      Owner_name: this.registrationForm.get('ownerName')?.value,
      Contact: this.registrationForm.get('contact')?.value,
      Address: this.registrationForm.get('address')?.value,
      Email: this.registrationForm.get('email')?.value,
      Password: this.registrationForm.get('password')?.value
    };

    this.branchService.sendOtp(this.newBranch).subscribe((Response) =>{
      console.log("otp sent to backend");
    }, (error) =>{
      console.log(error.message);
      
      console.log("otp can't send");
    })

    this.otpSent = true;
    this.resend = false;
    this.showOtp = true;
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
    this.showUpdateModal = false;
  }

  register(){

    this.newBranch = {
      Branch_Id: this.registrationForm.get('branchId')?.value,
      Branch_name: this.registrationForm.get('branchName')?.value,
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

  getBranchDetails(branchId: number, branchName: string, ownerName: string, contact: number, address: string, email: string){
    this.showUpdateModal = true;
    this.BranchId = branchId;
    this.updateDetailsForm.patchValue({
      Branch_name: branchName,
      Owner_name:ownerName,
      Contact:contact,
      Address:address,
      Email:email
    })
    console.log(this.updateDetailsForm.value);
    
  }

  updateBranchDetails(){
    this.branchService.updateBranchDetails(this.BranchId, this.updateDetailsForm.value).subscribe((response) =>{
      this.successmsg = "branch details updated successfully";
      setTimeout(() => {
        this.showUpdateModal = false;
        this.successMsg = this.successmsg = '';
        this.errorMsg = this.errormsg = ''
      }, 3000);
      this.getBranchData();
    }, (error) =>{
      this.errormsg = "details not updated"
    })
  }

}
