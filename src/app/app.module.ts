import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './loginpage/login.component';
import { UserDataService } from './services/user-data.service';
import { ReactiveFormsModule } from '@angular/forms'; // Import the ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';
import { BranchInventoryComponent } from './branch-inventory/branch-inventory.component'; // Import HttpClientModule
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { CartIconComponent } from './cart-icon/cart-icon.component';
import { BranchesComponent } from './branches/branches.component';
// import { CarouselComponent } from './carousel/carousel.component';

// import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    BranchInventoryComponent,
    CartComponent,
    CartIconComponent,
    BranchesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CarouselModule.forRoot(),
    FormsModule
  ],
  providers: [UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
