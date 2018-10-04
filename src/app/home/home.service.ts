import { EmployeeInfo } from './home.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class HomeService {
  private employeeInfo: EmployeeInfo[] = [];
  private employeeInfoUpdated = new Subject<EmployeeInfo[]>();

  getInfo() {
    // make a true copy of employeeInfo
    // edit or delete info would not affect employeeInfo array
    return [...this. employeeInfo];
  }

  // listen to the Subject object
  getInfoUpdateListener() {
    // return an obejct to which we can listen to
    return this.employeeInfoUpdated.asObservable();
  }

  addInfo(name: string, email: string) {
    const employeeInfo: EmployeeInfo = {
      // employeeID: id,
      employeeName: name,
      employeeEmail: email
    };
    this.employeeInfo.push(employeeInfo);
    // push/emit a new value nad the new value is a copy of the updated employee info
    this.employeeInfoUpdated.next([...this.employeeInfo]);
  }
}
