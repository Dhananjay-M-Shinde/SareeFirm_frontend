import { Component } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  constructor(private userDataService: UserDataService, private router:Router){}

  loginAsMainOwner(){
    this.userDataService.userTypes("MainOwner");
    this.router.navigate(['/loginPage']);

  }

  loginAsBranchOwner(){
    this.userDataService.userTypes("BranchOwner");
    this.router.navigate(['/loginPage']);
  }


}
