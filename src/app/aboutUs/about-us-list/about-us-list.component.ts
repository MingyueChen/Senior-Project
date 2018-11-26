import { Component, OnInit, OnDestroy } from '@angular/core';
import { AboutUsService } from '../aboutUs.service';
import { EmployeeInfo } from '../aboutUs.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-about-us-list',
  templateUrl: './about-us-list.component.html',
  styleUrls: ['./about-us-list.component.css']
})
export class AboutUsListComponent implements OnInit, OnDestroy {
  adminIsAuthenticated = false;
  private authListenerSubs: Subscription;
  employeeInfo = [
    // { employeeName: 'Tony', email: 'tony@gmail.com'},
    // { employeeName: 'Stephen H. Kattell', email: 'skattell@kattell.com' }
  ];

  private aboutUsSub: Subscription;
  constructor(public aboutUsService: AboutUsService, private authService: AuthService) { }

  ngOnInit() {

    this.aboutUsService.getInfo();
    // 1st argument in subscribe: a function which is called whenever a new value was received
    this.aboutUsSub = this.aboutUsService.getInfoUpdateListener()
      .subscribe((employeeInfo: EmployeeInfo[]) => {
       this.employeeInfo = employeeInfo;
      });
      this.adminIsAuthenticated = this.authService.getIsAuth();
      this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
        this.adminIsAuthenticated = isAuthenticated;
      });
  }

  onDelete(employeeID: string) {
    this.aboutUsService.deleteEmployeeInfo(employeeID);
  }
  // when this component is not part of DOM, the subcscriptions which we set up are not living anymore. Otherwise, we will get memory leak.
  ngOnDestroy() {
    this.aboutUsSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }


} // end of class
