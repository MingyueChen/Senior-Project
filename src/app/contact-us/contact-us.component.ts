import {Component, OnInit} from '@angular/core';
import {ContactService} from './contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  firstname: any = '';
  lastname: any = '';
  emailaddress: any = '';
  phonenumber: any = '';
  message: any = '';
  private latitude: number = 29.666688;
  private longitude: number = -82.333266;
  private zoom: number = 16;

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
  }

  send() {

    this.contactService.sendContact(this.firstname, this.lastname, this.emailaddress, this.phonenumber, this.message);
  }

  markerClick() {
    console.log('markerClick');
  }

}
