import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
// import { HomeCreateComponent } from './home/home-create/home-create.component';
import { HeaderComponent } from './header/header.component';
import { OfficeLocationComponent } from './office-location/office-location.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { DataTablesModule } from 'angular-datatables';
import { HomeListComponent } from './home/home-list/home-list.component';
import { HomeCreateComponent } from './home/home-create/home-create.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ContactService} from './contact-us/contact.service';
import { UserListComponent } from './user/user-list/user-list.component';


import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { ErrorComponent } from './error/error.component';
import { MatDialog } from '@angular/material';
import { CustominfoUploadComponent } from './custominfo-upload/custominfo-upload.component';
import { TestimonialsCreateComponent } from './testimonials/testimonials-create/testimonials-create.component';
import { TestimonialsListComponent } from './testimonials/testimonials-list/testimonials-list.component';
import { AboutUsListComponent } from './aboutUs/about-us-list/about-us-list.component';
import { AboutUsCreateComponent } from './aboutUs/about-us-create/about-us-create.component';
import { UserCreateComponent } from './user/user-create/user-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeCreateComponent,
    HeaderComponent,
    OfficeLocationComponent,
    ContactUsComponent,
    HomeListComponent,
    LoginComponent,
    SignupComponent,
    UserListComponent,
    ErrorComponent,
    CustominfoUploadComponent,
    TestimonialsCreateComponent,
    TestimonialsListComponent,
    AboutUsListComponent,
    AboutUsCreateComponent,
    UserCreateComponent
  ],
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    MatSnackBarModule,
    MatDialogModule,
    NgbModule,
    MatInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCpegHJIX14436l7SN4dFdGkaGXz9NgWWA'
    }),
    BrowserModule,
    BrowserAnimationsModule,
    FileUploadModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [ContactService,
              MatDialog,
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
