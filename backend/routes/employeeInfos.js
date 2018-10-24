const express = require("express");
const EmployeeInfo = require('../models/employeeInfo');
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.post('', checkAuth, (req, res, next) => {

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

router.put('/:id', checkAuth, (req, res, next) => {
  const info = new EmployeeInfo({
    _id: req.params.id,
    employeeName: req.body.employeeName,
    employeeEmail: req.body.employeeEmail
  });

  // the id matches ':/id'
  // second object is the new object we want to store
  EmployeeInfo.updateOne({ _id: req.params.id }, info).then(result => {
    res.status(200).json({messagge: "Update successful!"});
  })
})

router.get('', (req, res, next) => {
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

router.get('/:id', (req, res, next) => {
  EmployeeInfo.findById(req.params.id).then(info => {
    if (info) {
      res.status(200).json(info);
    } else {
      res.status(404).json({message: "Info not found!"});
    }
  });
});

router.delete('/:id', checkAuth, (req, res, next) => {
  // params is a property managed by Express which gives
  // me access to all enconded parameters. In our case, we only have one encoded parameter: id
  EmployeeInfo.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({message: "Info deleted!"});
  });
});

module.exports = router;

