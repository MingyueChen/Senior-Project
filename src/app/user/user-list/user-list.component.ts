import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { UserInfo } from '../user.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

declare var $: any;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  constructor(public userService: UserService, private authService: AuthService) { }
  adminIsAuthenticated = false;
  private authListenerSubs: Subscription;
  userInfo = [
    // { employeeName: 'Tony', email: 'tony@gmail.com'},
    // { employeeName: 'Stephen H. Kattell', email: 'skattell@kattell.com' }
  ];

  private userSub: Subscription;
  ngOnInit() {
    setTimeout(function () {
      $(function () {
        $('#userListComp').DataTable();
      });
    }, 1000);

    this.userService.getInfo();
    // 1st argument in subscribe: a function which is called whenever a new value was received
    this.userSub = this.userService.getInfoUpdateListener()
      .subscribe((userInfo: UserInfo[]) => {
       this.userInfo = userInfo;
      });
      this.adminIsAuthenticated = this.authService.getIsAuth();
      this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
        this.adminIsAuthenticated = isAuthenticated;
      });
  }


  onDelete(userID: string) {
    this.userService.deleteUserInfo(userID);
  }
  // when this component is not part of DOM, the subcscriptions which we set up are not living anymore. Otherwise, we will get memory leak.
  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }


}
