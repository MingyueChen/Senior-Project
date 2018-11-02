import { Contact } from './contact.model';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material';
import {of, fromEvent} from 'rxjs';
import { DialogService, BuiltInOptions } from 'ngx-bootstrap-modal';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({providedIn: 'root'})
export class ContactService {
  constructor (private http: HttpClient, private router: Router ) {}
  sendContact(firstName, lastName, emailAddress, phoneNumber, message) {
    if (firstName === '' || firstName === undefined || firstName === null) {
      alert('firstname could not be empty!');
    } else if (lastName === '' || lastName === undefined || lastName === null) {
      alert('lastname could not be empty!');
    } else if (emailAddress === '' || emailAddress === undefined || emailAddress === null) {
      alert('emailAdress could not be empty!');
    } else if (phoneNumber === '' || phoneNumber === undefined || phoneNumber === null) {
      alert('phoneNumber could not be empty!');
    } else if (message === '' || message === undefined || message === null) {
      alert('message could not be empty!');
    } else {
      let msg = 'firstname=' + firstName + '&lastname=' + lastName;
      msg = msg + '&emailaddress=' + emailAddress + '&phonenumber=' + phoneNumber + '&message=' + message;
      console.log(msg);
      const headers = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        })
      };
      this.http.post('http://localhost:3000/mail/send', msg, headers).subscribe(
        data => {
          console.log(data);
        }
      );
    }
  }
}
