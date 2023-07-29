import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './loginpage/login.component';

const routes: Routes = [
  // {path:"", component:HomepageComponent},
  // {path:"loginPage", component:LoginComponent}
  { path: '', component: HomepageComponent },
  { path: 'loginPage', component: LoginComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
