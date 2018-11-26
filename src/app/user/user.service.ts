import { UserInfo } from './user.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + 'user/';

@Injectable({providedIn: 'root'})
export class UserService {
  private userInfo: UserInfo[] = [];
  private userInfoUpdated = new Subject<UserInfo[]>();

  constructor(private http: HttpClient, private router: Router) {}
  getInfo() {
    this.http.get<{message: string, userInfo: any}>(BACKEND_URL)
    .pipe(map((infoData) => {
      return infoData.userInfo.map(info => {
        return {
          userName: info.userName,
          userWebsite: info.userWebsite,
          userID: info._id,
          userLocation: info.userLocation
        };
      });
    }))
    .subscribe((transformedInfo) => {
     // this.userInfo = infoData.userInfo;
      this.userInfo = transformedInfo;
      this.userInfoUpdated.next([...this.userInfo]);
    });
  }

  // listen to the Subject object
  getInfoUpdateListener() {
    // return an obejct to which we can listen to
    return this.userInfoUpdated.asObservable();
  }

  getUserInfo(id: string) {
    return this.http.get <{_id: string, userName: string, userWebsite: string, userLocation: string}>(BACKEND_URL + id);
  }

  addInfo(name: string, website: string, location: string) {

    const userData: UserInfo = {
      userID: null,
      userName: name,
      userWebsite: website,
      userLocation: location
    };
    this.http.post<{message: string, info}>(BACKEND_URL, userData)
    .subscribe((responseData) => {
      console.log(responseData);
      const userInfo: UserInfo = {
        userID: responseData.info.id,
        userName: name,
        userWebsite: website,
        userLocation: location
      };

      // const id = responseData.infoID;
      // userInfo.userID = id;
      this.userInfo.push(userInfo);
      // push/emit a new value nad the new value is a copy of the updated employee info
      this.userInfoUpdated.next([...this.userInfo]);
      this.router.navigate(['/userList']);
    });
  }

  updateUserInfo(id: string, name: string, website: string, location: string) {
    let userData: UserInfo;
      userData = {
        userID: id,
        userWebsite: website,
        userName: name,
        userLocation: location};
    // '+id', the id matches the id passed into the function
    // userInfo is the const created in this function
    this.http.put(BACKEND_URL + id, userData).subscribe(response => {
      const updatedInfo = [...this.userInfo];
      const oldInfoIndex = updatedInfo.findIndex( e => e.userID === id);
      const userInfo: UserInfo = {
        userID: id,
        userWebsite: website,
        userName: name,
        userLocation: location
      };
        updatedInfo[oldInfoIndex] = userInfo;
        this.userInfo = updatedInfo;
        this.userInfoUpdated.next([...this.userInfo]);
        this.router.navigate(['/userList']);
    });
  }

  deleteUserInfo(infoID: string) {
    this.http.delete(BACKEND_URL + infoID)
    .subscribe(() => {
      const updatedUserInfo = this. userInfo.filter(info => info.userID !== infoID );
      this.userInfo = updatedUserInfo;
      this.userInfoUpdated.next([...this.userInfo]);
    });
  }
}
