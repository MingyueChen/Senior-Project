//Add the Express app and all the files that belong to it in the backend folder now
//This app.js file will hold the Express app which is still
//a NodeJS server-side app which takes advantage of express features
const express = require('express');
const bodyParser = require ("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const employeeInfosRoutes = require("./routes/employeeInfos");
const sendEmailsRoutes = require("./routes/sendEmails");
const adminRoutes = require("./routes/admin");
const userInfosRoutes = require("./routes/userInfos");

const app = express(); //return an express app

mongoose.connect("mongodb+srv://Mingyue:" + process.env.MONGO_ATLAS_PW + "@kattell-and-company-wyfek.mongodb.net/kattell-and-company",{useNewUrlParser: true})
.then(() => {

})
.catch(() => {
  console.log('Connection failed.');
});
mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/user', userInfosRoutes);
app.use('/employee', employeeInfosRoutes);
app.use('/mail', sendEmailsRoutes);
app.use('/admin', adminRoutes);
app.use("/static/file",express.static(path.join(__dirname, 'uploadfile')));
app.use("/images", express.static(path.join("backend/images")));
module.exports = app;

