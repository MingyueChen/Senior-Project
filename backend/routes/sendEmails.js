const express = require("express");
const nodemailer= require ("nodemailer");
const router = express.Router();

let transporter  = nodemailer.createTransport({
  service: 'gmail',

  secure: true,

  auth: {
    user: 'xrj0830@gmail.com',
    pass: 'Xrj2017!',
  }});


  router.post('/send',(req,res,next)=>{
    console.log(req.body);
    mailOptions= {
      from: 'req.body.emailaddress ', // login user must equel to this user
      to: 'rxu960830@ufl.edu',
      subject: 'Title Nodejs Send',
      text: 'Some simple words.',
      html: "<b>"+"firstName:"+req.body.firstname+" "+
              "lastName:"+req.body.lastname+" "+
              "email:"+req.body.emailaddress+" "+
              "phonenumber:"+req.body.phonenumber+" "+
              "message:"+req.body.message+" "+"</b>"
    };
      transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
    res.status(200).json({message: req.body.firstname});
  });

module.exports = router;
