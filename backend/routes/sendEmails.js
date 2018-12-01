const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

var fs = require('fs');
var path = require('path');

var util = require('util');
var multer  = require('multer');
var upload = multer({dest: 'backend/upload_tmp/'});

var getFileTypeName = function(filename){
  var index1=filename.lastIndexOf(".");
  var index2=filename.length;
  var postf=filename.substring(index1,index2);
  return postf;
};
var transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  service: 'qq',
  secure: true,
  auth: {
    user: '2242135581@qq.com',  // 2242135581@qq.com
    pass: 'dfdwfocduipyeacd'    // dfdwfocduipyeacd
  }
});

router.post('/send', function (req, res, next) {

  var emailaddress = req.body.emailaddress;
  var firstname = req.body.firstname;
  var imgurl = req.body.imgurl;
  var lastname = req.body.lastname;

  // var transporter = nodemailer.createTransport('smtps://hbiao68%40yeah.net:1q2w3e4r5t@smtp.yeah.net');

  var sendHtml = `<div>
  <div>firstName : ${firstname}</div>
  <div>lastname : ${lastname}</div>
  <div>emailaddress : ${emailaddress}</div>
  <div>file : <a href="${imgurl}">down upload file</a> </div>
</div>`;


  var mailOptions = {
    from: '2242135581@qq.com', // login user must equal to this user
    to: 'xrj0830@gmail.com',  // xrj0830@gmail.com
    subject: 'You have a new uploaded file',
    html: sendHtml
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
  res.status(200).json({message: req.body.firstname});
});

router.post('/upload',upload.any(), function(req, res, next) {
  console.log("/mail/upload");
  console.log(req.files);

  var originFileName = req.files[0].originalname;
  var fileName = "f" + new Date().getTime()+Math.floor(Math.random(1000)*1000) + getFileTypeName(originFileName);
  var des_file = "./backend/uploadfile/" + fileName;
  fs.readFile( req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if( err ){
        console.log("error")
        console.log( err );
      }else{
        console.log("sucess")
        response = {
          filename: originFileName,
          message:'File uploaded successfully',
          url: "http://" + req.headers.host + "/static/file/"+fileName
        };
        console.log( response );
        res.end( JSON.stringify( response ) );
      }
    });
  });
});


router.post('/contactUs', function (req, res, next) {
  console.log(req.body);
  var contactUsHtml = `<div>
    <div>firstName : ${req.body.firstname}</div>
    <div>lastName : ${req.body.lastname}</div>
    <div>email : ${req.body.emailaddress}</div>
    <div>phonenumber : ${req.body.phonenumber}</div>`;

  if (req.body.message !== undefined && req.body.message !== null && req.body.message !== '') {
    contactUsHtml = contactUsHtml + `<div>message : ${req.body.message}</div>`;
  }
  if (req.body.fileUrl !== undefined && req.body.fileUrl !== null && req.body.fileUrl !== '') {
    contactUsHtml = contactUsHtml + `<div>file : <a href="${req.body.fileUrl}" _target="blank">down upload file</a> </div>`
  }
  contactUsHtml = contactUsHtml + '</div>';

  var mailOptions = {
    from: '2242135581@qq.com', // login user must equal to this user
    to: 'rxu960830@ufl.edu',  // xrj0830@gmail.com
    subject: 'You have a new message',
    html: contactUsHtml
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
  res.status(200).json({message: 'send OK'});
})
;
module.exports = router;
