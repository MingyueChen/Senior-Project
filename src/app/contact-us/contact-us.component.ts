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

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
  }

  send() {

    this.contactService.sendContact(this.firstname, this.lastname, this.emailaddress, this.phonenumber, this.message);
  }

}
