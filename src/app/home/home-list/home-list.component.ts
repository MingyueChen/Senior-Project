import { Component, OnInit, OnDestroy } from '@angular/core';
import {  HomeService } from '../home.service';
import { EmployeeInfo } from '../home.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit, OnDestroy {
  employeeInfo = [
    // { employeeName: 'Tony', email: 'tony@gmail.com'},
    // { employeeName: 'Stephen H. Kattell', email: 'skattell@kattell.com' }
  ];
  private homeSub: Subscription;
  constructor(public homeService: HomeService) { }

  ngOnInit() {
    this.employeeInfo = this.homeService.getInfo();
    // 1st argument in subscribe: a function which is called whenever a new value was received
    this.homeSub = this.homeService.getInfoUpdateListener()
      .subscribe((employeeInfo: EmployeeInfo[]) => {
       this.employeeInfo = employeeInfo;
      });
  }

  // when this component is not part of DOM, the subcscriptions which we set up are not living anymore. Otherwise, we will get memory leak.
  ngOnDestroy() {
    this.homeSub.unsubscribe();
  }

}
