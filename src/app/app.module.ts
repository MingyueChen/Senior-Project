import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeCreateComponent } from './home/home-create/home-create.component';
import { HeaderComponent } from './header/header.component';
import { OfficeLocationComponent } from './office-location/office-location.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeListComponent } from './home/home-list/home-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeCreateComponent,
    HeaderComponent,
    OfficeLocationComponent,
    ContactUsComponent,
    HomeListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
