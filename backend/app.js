//Add the Express app and all the files that belong to it in the backend folder now
//This app.js file will hold the Express app which is still
//a NodeJS server-side app which takes advantage of express features
const express = require('express');
const bodyParser = require ("body-parser");
const mongoose = require("mongoose");
const EmployeeInfo = require('./models/employeeInfo');
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
mongoose.connect("mongodb+srv://Mingyue:YHscIiTW176wx73Y@kattell-and-company-wyfek.mongodb.net/kattell-and-company?retryWrites=true",{useNewUrlParser: true})
.then(() => {

})
.catch(() => {
  console.log('Connection failed.');
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.post('/', (req, res, next) => {

  const info = new EmployeeInfo({
    employeeName: req.body.employeeName,
    employeeEmail: req.body.employeeEmail
  });

  // the save method is provided by the mongoose package
  // for every model created with it.
  // that's why we create the object info with a model
  // what mongoose will do behind the scenes is that it automatically creates
  // the right query for the databse to insert a new entry, precisely,
  // a new document (info) with the above data
  // and save() also automatically generated ID into databases.
  // the documents are stored in collections.
  // the name of the collection is always the plural form of my model name
  // in my case, my model name is EmployeeInfo, so my collection name will be
  // all lowercase plural: employeeinfos
  // Hence, employeeinfos is a collection which will be created
  // automatically for me in the automatically created database kattell-and-company.
  // And mongoose will automatically save info as a new document
  // createdEmployeeInfo is the employee info we just stored
  // including employee name, email, and _id
  info.save().then(createdEmployeeInfo => {
    // return a response
    res.status(201).json({
      message: 'Info added successfully',
      infoID: createdEmployeeInfo._id
    });
  });
});

app.put('/:id', (req, res, next) => {
  const info = new EmployeeInfo({
    _id: req.body.id,
    employeeName: req.body.employeeName,
    employeeEmail: req.body.employeeEmail
  });
  // EmployeeInfo is the model we import
  // the id matches ':/id'
  // second object is the new object we want to store
  EmployeeInfo.updateOne({_id: req.params.id}, info).then(result => {
    res.status(200).json({messagge: "Update successful!"});
  })
})

app.get('/', (req, res, next) => {
  // use EmployeeInfo model and a static method (find) again to find the info
  // then block holds results
  EmployeeInfo.find()
    .then(documents => {
      res.status(200).json({
      message: "fetched successfully",
      employeeInfo: documents
      });
    });
});

app.get('/:id', (req, res, next) => {
  EmployeeInfo.findById(req.params.id).then(info => {
    if (info) {
      res.status(200).json(info);
    } else {
      res.status(404).json({message: "Info not found!"});
    }
  })
})
app.delete('/:id', (req, res, next) => {
  // params is a property managed by Express which gives
  // me access to all enconded parameters. In our case, we only have one encoded parameter: id
  EmployeeInfo.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({message: "Info deleted!"});
  });
});

module.exports = app;

