import { EmployeeInfo } from './home.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class HomeService {
  private employeeInfo: EmployeeInfo[] = [];
  private employeeInfoUpdated = new Subject<EmployeeInfo[]>();

  constructor(private http: HttpClient, private router: Router) {}
  getInfo() {
    // make a true copy of employeeInfo
    // edit or delete info would not affect employeeInfo array
    // return [...this. employeeInfo];

    // operators are basically functions that we can apply to the data we get through observable streams
    // pipe allows us to add in an operator: pipe is a method that accepts multiple operators
    // map expects an argument --- a function which should execute on every data that makes
    // it through observable stream
    // the first map on line 24 is an operator, but the second pipe on line 25 is a normal JavaScript method
    this.http.get<{message: string, employeeInfo: any}>(BACKEND_URL)
    .pipe(map((infoData) => {
      // we want to return an array of employeeInfo
      // this first return (on line 28) will automatically be wrapped into an
      // observable by rxjs so that the subscribe method still subscribe an observable
      // notice: infoData.employeeInfo is just an array
      return infoData.employeeInfo.map(info => {
        return {
          employeeName: info.employeeName,
          employeeEmail: info.employeeEmail,
          employeeID: info._id
        };
      });
    }))
    .subscribe((transformedInfo) => {
     // this.employeeInfo = infoData.employeeInfo;
      this.employeeInfo = transformedInfo;
      this.employeeInfoUpdated.next([...this.employeeInfo]);
    });
    // this.http.get<{message: string; information: any }>('http://localhost:3000/')
    // .subscribe((infoData) => {
    //   this.employeeInfo = infoData.information;
    //   this.employeeInfoUpdated.next([...this.employeeInfo]);
    // });
  }

  // listen to the Subject object
  getInfoUpdateListener() {
    // return an obejct to which we can listen to
    return this.employeeInfoUpdated.asObservable();
  }

  getEmployeeInfo(id: string) {
    return this.http.get <{_id: string, employeeName: string, employeeEmail: string}>(BACKEND_URL + id);
  }

  addInfo(name: string, email: string) {
    const employeeInfo: EmployeeInfo = {
      employeeID: null,
      employeeName: name,
      employeeEmail: email
    };
    this.http.post<{message: string, infoID: string}>(BACKEND_URL, employeeInfo)
    .subscribe((responseData) => {
      const id = responseData.infoID;
      employeeInfo.employeeID = id;
      this.employeeInfo.push(employeeInfo);
      // push/emit a new value nad the new value is a copy of the updated employee info
      this.employeeInfoUpdated.next([...this.employeeInfo]);
      this.router.navigate(['/']);
    });
  }

  updateEmployeeInfo(id: string, name: string, email: string) {
    const employeeInfo = {employeeID: id, employeeEmail: email, employeeName: name};
    // '+id', the id matches the id passed into the function
    // employeeInfo is the const created in this function
    this.http.put(BACKEND_URL + id, employeeInfo).subscribe(response => {
      const updatedInfo = [...this.employeeInfo];
      const oldInfoIndex = updatedInfo.findIndex( e => e.employeeID === employeeInfo.employeeID
        );
        updatedInfo[oldInfoIndex] = employeeInfo;
        this.employeeInfo = updatedInfo;
        this.employeeInfoUpdated.next([...this.employeeInfo]);
        this.router.navigate(['/']);
    });
  }

  deleteEmployeeInfo(infoID: string) {
    this.http.delete(BACKEND_URL + infoID)
    .subscribe(() => {
      const updatedEmployeeInfo = this. employeeInfo.filter(info => info.employeeID !== infoID );
      this.employeeInfo = updatedEmployeeInfo;
      this.employeeInfoUpdated.next([...this.employeeInfo]);
    });
  }
}
