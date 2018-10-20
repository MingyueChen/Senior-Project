//Add the Express app and all the files that belong to it in the backend folder now
//This app.js file will hold the Express app which is still
//a NodeJS server-side app which takes advantage of express features
const express = require('express');

const bodyParser = require ("body-parser");
const mongoose = require("mongoose");

const employeeInfosRoutes = require("./routes/employeeInfos");
const sendEmailsRoutes = require("./routes/sendEmails");
const adminRoutes = require("./routes/admin");

const app = express(); //return an express app

//app.use uses a middleware on our app and on the incoming request
//use method takes a function which is executed for an incoming request
//And that function takes three arguments: request, response, next function
//next () will continue the request to the next middleware
// app.use((req, res, next) => {
//   console.log('First middleware');
//   next();
// });

// kattell-and-company is the database where we store data in
// mongoose.connect() will automatically on the fly create
// katteell-and-company database the first time I try to write to it
// and it will create a new info entry or documents
// (below, I used info.save(), so the entry is info)

mongoose.connect("mongodb+srv://Mingyue:YHscIiTW176wx73Y@kattell-and-company-wyfek.mongodb.net/kattell-and-company",{useNewUrlParser: true})
.then(() => {

})
.catch(() => {
  console.log('Connection failed.');
});
mongoose.set('useCreateIndex', true);

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('', employeeInfosRoutes);
app.use('', sendEmailsRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;

