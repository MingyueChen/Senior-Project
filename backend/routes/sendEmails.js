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

router.post('/send', function (req, res, next) {

  var emailaddress = req.body.emailaddress;
  var firstname = req.body.firstname;
  var imgurl = req.body.imgurl;
  var lastname = req.body.lastname;

  // send email server
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    secure: true,
    auth: {
      user: 'xrj0830@gmail.com',
      pass: 'Xrj2017!'
    }
  });

  // var transporter = nodemailer.createTransport('smtps://hbiao68%40yeah.net:1q2w3e4r5t@smtp.yeah.net');

  var userInputInfo = "firstName : " +  firstname + "<br/>";
  userInputInfo = userInputInfo + "  lastname:  " +  lastname + "<br/>";
  userInputInfo = userInputInfo + "file : <a href=''" + imgurl +  "'>"+imgurl+'</a>' + "<br/>";
  userInputInfo = userInputInfo + "  emailaddress : " +  emailaddress + "<br/>";

  // console.log(req.body);
  var mailOptions = {
    from: 'req.body.emailaddress', // login user must equel to this user
    to: 'xrj0830@gmail.com',
    subject: 'You have a new uploaded file',
    html: userInputInfo
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

  var fileName = "f" + new Date().getTime()+Math.floor(Math.random(1000)*1000) + getFileTypeName(req.files[0].originalname)
  var des_file = "./backend/uploadfile/" + fileName;
  fs.readFile( req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if( err ){
        console.log("error")
        console.log( err );
      }else{
        console.log("sucess")
        response = {
          message:'File uploaded successfully',
          url: "http://" + req.headers.host + "/static/file/"+fileName
        };
        console.log( response );
        res.end( JSON.stringify( response ) );
      }
    });
  });
});

router.post('/post', function (req, res, next) {
  res.json(200, {
    "body": req.body,
    "query": req.query,
    "params": req.params,
  });
});

router.get('/get', function (req, res, next) {
  res.json(200, {
    "body": req.body,
    "query": req.query,
    "params": req.params,
  });
});


module.exports = router;
