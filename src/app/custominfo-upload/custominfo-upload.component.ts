import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-custominfo-upload',
  templateUrl: './custominfo-upload.component.html',
  styleUrls: ['./custominfo-upload.component.css']
})
export class CustominfoUploadComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url: '/mail/upload',
    method: 'POST',
    itemAlias: 'uploadedfile'
});
  emailaddress: string = '';
  firstname: string = '';
  lastname: string = '';
  fileUrl: string = '';

  public http: HttpClient;
  constructor (http: HttpClient) {
    this.http = http;
  }

  ngOnInit () {
  }

  sendUserInfo () {
    if (this.firstname === '' || this.firstname === undefined || this.firstname === null){
      alert('please input lastname');
      return false;
    }
    if (this.lastname === '' || this.lastname === undefined || this.lastname === null){
      alert('please input lastname');
      return false;
    }
    if (this.emailaddress === '' || this.emailaddress === undefined || this.emailaddress === null){
      alert('please input lastname');
      return false;
    }

    const msg = 'emailaddress=' + this.emailaddress + '&firstname=' + this.firstname + '&lastname='+this.lastname + '&imgurl='+this.fileUrl;
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      })
    };
    this.http.post('http://localhost:3000/mail/send', msg, headers).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  selectedFileOnChanged (eventObj) {
    // console.dir(eventObj);
    this.uploadFileHandel();
  }

  uploadFileHandel() {
    let that = this;
    this.uploader.queue[0].onSuccess = function (response, status, headers) {
      if (status == 200) {
        let tempRes = JSON.parse(response);
        that.fileUrl = tempRes.url;
      }else {
      }
    };
    this.uploader.queue[0].upload(); 
  }

}
