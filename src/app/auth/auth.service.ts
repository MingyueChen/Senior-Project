import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor (private http: HttpClient) {}

  createAdmin (email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    }; // end of create authData
    console.log('front end: ' + authData.email + '  ' + authData.password);
    this.http.post('http://localhost:3000/api/admin/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  } // end of createAdmin
} // end of AuthService
