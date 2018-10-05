import { EmployeeInfo } from './home.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class HomeService {
  private employeeInfo: EmployeeInfo[] = [];
  private employeeInfoUpdated = new Subject<EmployeeInfo[]>();

  constructor(private http: HttpClient) {}
  getInfo() {
    // make a true copy of employeeInfo
    // edit or delete info would not affect employeeInfo array
    // return [...this. employeeInfo];

    this.http.get<{message: string, infomation: EmployeeInfo[] }>('http://localhost:3000/')
    .subscribe((info) => {
      this.employeeInfo = info.infomation;
      this.employeeInfoUpdated.next([...this.employeeInfo]);
    });
  }

  // listen to the Subject object
  getInfoUpdateListener() {
    // return an obejct to which we can listen to
    return this.employeeInfoUpdated.asObservable();
  }

  addInfo(name: string, email: string) {
    const employeeInfo: EmployeeInfo = {
      employeeID: null,
      employeeName: name,
      employeeEmail: email
    };
    this.http.post<{message: string}>('http://localhost:3000/', employeeInfo)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.employeeInfo.push(employeeInfo);
      // push/emit a new value nad the new value is a copy of the updated employee info
      this.employeeInfoUpdated.next([...this.employeeInfo]);
    });
  }
}
