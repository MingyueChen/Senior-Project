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
    // 发送信息给后台用户
    this.http.post('http://localhost:3000/mail/send', msg, headers).subscribe(
      data => {
        console.log(data);
      }
    );
  }


  // 定义上传文件的回调函数
  selectedFileOnChanged (eventObj) {
    // console.dir(eventObj);
    this.uploadFileHandel();
  }

  // 文件控件自动上传文件
  uploadFileHandel() {
    let that = this;
    this.uploader.queue[0].onSuccess = function (response, status, headers) {
      // 上传文件成功
      if (status == 200) {
        // 上传文件后获取服务器返回的数据
        let tempRes = JSON.parse(response);
        that.fileUrl = tempRes.url;
      }else {
        // 上传文件后获取服务器返回的数据错误
      }
    };
    this.uploader.queue[0].upload(); // 开始上传
  }

}
