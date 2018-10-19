import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeCreateComponent } from './home/home-create/home-create.component';
import {  HomeListComponent } from './home/home-list/home-list.component';
import { OfficeLocationComponent } from './office-location/office-location.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


const routes: Routes = [
  { path: '', component: HomeListComponent },
  { path: 'addEmployeeInfo', component: HomeCreateComponent},
  { path: 'officeLocation', component: OfficeLocationComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'edit/:employeeID', component: HomeCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
