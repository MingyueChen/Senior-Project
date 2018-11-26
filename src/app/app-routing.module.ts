import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeCreateComponent } from './home/home-create/home-create.component';
import {  HomeListComponent } from './home/home-list/home-list.component';
import { OfficeLocationComponent } from './office-location/office-location.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CustominfoUploadComponent } from './custominfo-upload/custominfo-upload.component';
import { AuthGuard } from './auth/auth.guard';
import { TestimonialsCreateComponent } from './testimonials/testimonials-create/testimonials-create.component';
import { TestimonialsListComponent } from './testimonials/testimonials-list/testimonials-list.component';
import { AboutUsListComponent } from './aboutUs/about-us-list/about-us-list.component';
import { AboutUsCreateComponent } from './aboutUs/about-us-create/about-us-create.component';

const routes: Routes = [
  { path: '', component: HomeListComponent },
  { path: 'addEmployeeInfo', component: AboutUsCreateComponent, canActivate: [AuthGuard]},
  { path: 'addUserInfo', component: UserCreateComponent, canActivate: [AuthGuard] },
  { path: 'officeLocation', component: OfficeLocationComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'userList', component: UserListComponent },
  { path: 'edit/:employeeID', component: AboutUsCreateComponent, canActivate: [AuthGuard] },
  { path: 'user/edit/:userID', component: UserCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'CustominfoUploadComponent', component: CustominfoUploadComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'testimonials', component: TestimonialsListComponent },
  { path: 'aboutUs', component: AboutUsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
