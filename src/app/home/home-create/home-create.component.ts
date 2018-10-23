import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  HomeService } from '../home.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeInfo } from '../home.model';

@Component({
  selector: 'app-home-create',
  templateUrl: './home-create.component.html',
  styleUrls: ['./home-create.component.css']
})
export class HomeCreateComponent implements OnInit {

  private mode = 'create';
  private employeeID: string;
  employeeInfo: EmployeeInfo;
  constructor(public homeService: HomeService, public route: ActivatedRoute) { }

  ngOnInit() {
    // try to find out whether we have an employeeID or not
    // we can extract this by accessing this route,
    // so out inject activated route and we have maraMap object or property
    // paraMap is actually an observable to which we can subscribe
    // the call back function will be called whenever the parameter changes
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // we check if it has 'employeeID' because we name it employeeID in app-routing.module.ts
      if (paramMap.has('employeeID')) {
        this.mode = 'edit';
        this.employeeID = paramMap.get('employeeID');
        this.homeService.getEmployeeInfo(this.employeeID).subscribe(infoData => {
          this.employeeInfo = {employeeID: infoData._id, employeeEmail: infoData.employeeEmail, employeeName: infoData.employeeName};
        });
      } else {
        this.mode = 'create';
        this.employeeID = null;
      }
    });
  }

  onSaveEmployeeInfo (form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.homeService.addInfo(form.value.employeeName, form.value.employeeEmail);
    } else {
      this.homeService.updateEmployeeInfo(this.employeeID, form.value.employeeName, form.value.employeeEmail);
    }
    form.resetForm();
  }


}// end of class
