import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import {  FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { MatSnackBarModule, MatDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeCreateComponent } from './home/home-create/home-create.component';
import { HeaderComponent } from './header/header.component';
import { OfficeLocationComponent } from './office-location/office-location.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { DataTablesModule } from 'angular-datatables';
import { HomeListComponent } from './home/home-list/home-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ContactService} from './contact-us/contact.service';
import { UserListComponent } from './user-list/user-list.component';


import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { ErrorComponent } from './error/error.component';
import { MatDialog } from '@angular/material';
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
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    HttpModule,
    MatSnackBarModule,
    MatDialogModule,
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
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
