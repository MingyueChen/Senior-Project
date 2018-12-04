import {Component, OnInit} from '@angular/core';
import {ContactService} from './contact.service';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';


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
  fileUrl: string = '';
  sendMsgType: string = 'message';
  private latitude: number = 29.666688;
  private longitude: number = -82.333266;
  private zoom: number = 16;

  uploader: FileUploader = new FileUploader({
    url: '/mail/upload',
    method: 'POST',
    itemAlias: 'uploadedfile'
  });

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
  }

  send() {
    if (this.firstname === '' || this.firstname === undefined || this.firstname === null) {
      alert('firstname could not be empty!');
      return false;
    } else if (this.lastname === '' || this.lastname === undefined || this.lastname === null) {
      alert('lastname could not be empty!');
      return false;
    } else if (this.emailaddress === '' || this.emailaddress === undefined || this.emailaddress === null) {
      alert('emailAdress could not be empty!');
      return false;
    } else if (this.phonenumber === '' || this.phonenumber === undefined || this.phonenumber === null) {
      alert('phoneNumber could not be empty!');
      return false;
    }

    if (this.sendMsgType === 'message') {
      if (this.message === '' || this.message === undefined || this.message === null) {
        alert('message could not be empty!');
        return false;
      }
    }
    if (this.sendMsgType === 'file') {
      if (this.fileUrl === '' || this.fileUrl === undefined || this.fileUrl === null) {
        alert('file could not be empty!');
        return false;
      }
    }
    if (this.sendMsgType === 'both') {
      if (this.fileUrl === '' || this.fileUrl === undefined || this.fileUrl === null || this.message === '' || this.message === undefined || this.message === null) {
        alert('message and file could not be empty!');
        return false;
      }
    }
    this.contactService.sendContact(this.firstname, this.lastname, this.emailaddress, this.phonenumber, this.message, this.fileUrl, this);
  }

  markerClick() {
    console.log('markerClick');
  }

  selectedFileOnChanged (eventObj) {
    // console.dir(eventObj);
    this.uploadFileHandel();
  }

  uploadFileHandel() {
    let that = this;
    var indexNum = this.uploader.queue.length - 1;

    console.log('this.uploader.queue[indexNum].file.name: ' + this.uploader.queue[indexNum].file.name);
    if (this.uploader.queue[indexNum].file.name === 'cartoon_birds.jpg') {
      console.log('cartoon_birds.jpg')
      that.fileUrl = 'http://kattell-test.us-east-2.elasticbeanstalk.com:3000/static/file/f1541608751118522.jpg';
    }else if (this.uploader.queue[indexNum].file.name === 'parrot_birds.jpg') {
      console.log('parrot_birds.jpg')
      that.fileUrl = 'http://kattell-test.us-east-2.elasticbeanstalk.com:3000/static/file/f1541608751118521.jpg';
    }else {
      console.log('els');
      that.fileUrl = 'http://kattell-test.us-east-2.elasticbeanstalk.com:3000/static/file/f1541608751118521.jpg';
    }

    this.uploader.queue[indexNum].onSuccess = function (response, status, headers) {
      if (status === 200) {
        let tempRes = JSON.parse(response);
        that.fileUrl = tempRes.url;
      } else {
      }
    };
    this.uploader.queue[indexNum].upload();
  }

}
