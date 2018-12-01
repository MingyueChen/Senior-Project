import { Contact } from './contact.model';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material';
import {of, fromEvent} from 'rxjs';
import { DialogService, BuiltInOptions } from 'ngx-bootstrap-modal';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class ContactService {
  constructor (private http: HttpClient, private router: Router ) {}
  sendContact(firstName, lastName, emailAddress, phoneNumber, message, fileUrl, compObj) {
    let msg = 'firstname=' + firstName + '&lastname=' + lastName;
    msg = msg + '&emailaddress=' + emailAddress + '&phonenumber=' + phoneNumber + '&message=' + message + '&fileUrl=' + fileUrl;
    console.log(msg);
    debugger
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      })
    };
    this.http.post(BACKEND_URL + 'mail/contactUs', msg, headers).subscribe(
      data => {
        console.log(data);
        alert('Send Success!');
        compObj.firstname = '';
        compObj.lastname = '';
        compObj.emailaddress = '';
        compObj.phonenumber = '';
        compObj.message = '';
        var fileObj = (<HTMLInputElement>document.getElementById('contactUsfileWidget'));
        if (fileObj !== undefined && fileObj !== null) {
          fileObj.value = '';
        }
      }
    );
  }
}
