import { EmployeeInfo } from './home.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class HomeService {
  private employeeInfo: EmployeeInfo[] = [];
  private employeeInfoUpdated = new Subject<EmployeeInfo[]>();

  constructor(private http: HttpClient) {}
  getInfo() {
    // make a true copy of employeeInfo
    // edit or delete info would not affect employeeInfo array
    // return [...this. employeeInfo];

    // operators are basically functions that we can apply to the data we get through observable streams
    // pipe allows us to add in an operator: pipe is a method that accepts multiple operators
    // map expects an argument --- a function which should execute on every data that makes
    // it through observable stream
    // the first map on line 24 is an operator, but the second pipe on line 25 is a normal JavaScript method
    this.http.get<{message: string, employeeInfo: any}>('http://localhost:3000/')
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

  addInfo(name: string, email: string) {
    const employeeInfo: EmployeeInfo = {
      employeeID: null,
      employeeName: name,
      employeeEmail: email
    };
    this.http.post<{message: string, infoID: string}>('http://localhost:3000/', employeeInfo)
    .subscribe((responseData) => {
      const id = responseData.infoID;
      employeeInfo.employeeID = id;
      this.employeeInfo.push(employeeInfo);
      // push/emit a new value nad the new value is a copy of the updated employee info
      this.employeeInfoUpdated.next([...this.employeeInfo]);
    });
  }

  deleteEmployeeInfo(infoID: string) {
    this.http.delete('http://localhost:3000/' + infoID)
    .subscribe(() => {
      const updatedEmployeeInfo = this. employeeInfo.filter(info => info.employeeID !== infoID );
      this.employeeInfo = updatedEmployeeInfo;
      this.employeeInfoUpdated.next([...this.employeeInfo]);
    });
  }
}
