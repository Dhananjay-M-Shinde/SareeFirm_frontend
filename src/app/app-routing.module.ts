import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './loginpage/login.component';
import { BranchInventoryComponent } from './branch-inventory/branch-inventory.component';

const routes: Routes = [
  // {path:"", component:HomepageComponent},
  // {path:"loginPage", component:LoginComponent}
  { path: '', component: HomepageComponent },
  { path: 'loginPage', component: LoginComponent } ,
  { path: 'branchInventory', component: BranchInventoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
