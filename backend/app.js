//Add the Express app and all the files that belong to it in the backend folder now
//This app.js file will hold the Express app which is still
//a NodeJS server-side app which takes advantage of express features
const express = require('express');

const app = express(); //return an express app

//app.use uses a middleware on our app and on the incoming request
//use method takes a function which is executed for an incoming request
//And that function takes three arguments: request, response, next function
//next () will continue the request to the next middleware
// app.use((req, res, next) => {
//   console.log('First middleware');
//   next();
// });
const bodyParser = require ("body-parser");
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/', (req, res, next) => {
  const info = req.body;
  console.log(info);
  // return a response
  res.status(201).json({
    message: 'Info added successfully'
  });
});

app.get('/', (req, res, next) => {
  const info = [
    { employeeID: '2fg28',
      employeeName: 'Jack',
      employeeEmail: 'minas@gmail.com'
    },

    { employeeID: '34ytey34',
      employeeName: 'Lisa',
      employeeEmail: 'lisa_8@gmail.com'
    }
  ];
  res.status(200).json({
    message: 'Employee Info fetched successfully',
    infomation: info
  });
});

module.exports = app;

