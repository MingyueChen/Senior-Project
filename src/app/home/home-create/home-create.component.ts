import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  HomeService } from '../home.service';

@Component({
  selector: 'app-home-create',
  templateUrl: './home-create.component.html',
  styleUrls: ['./home-create.component.css']
})
export class HomeCreateComponent implements OnInit {

  enteredStaffEmail = '';
  enteredStaffName = '';

  constructor(public homeService: HomeService) { }

  ngOnInit() {
  }

  onAddEmployeeInfo (form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.homeService.addInfo(form.value.employeeEmail, form.value.employeeName);
  }

}// end of class
