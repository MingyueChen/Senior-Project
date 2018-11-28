import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

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
    var that = this;
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
    this.http.post(BACKEND_URL + 'mail/send', msg, headers).subscribe(
      data => {
        console.log(data);
        alert('Send Success!');
        that.firstname = '';
        that.lastname = '';
        that.emailaddress = '';
        var fileObj = (<HTMLInputElement>document.getElementById('fileWidget'));
        fileObj.value = '';
      }
    );
  }

  selectedFileOnChanged (eventObj) {
    // console.dir(eventObj);
    this.uploadFileHandel();
  }

  uploadFileHandel() {
    let that = this;
    var indexNum = this.uploader.queue.length - 1;
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
