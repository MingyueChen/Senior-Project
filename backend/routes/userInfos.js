const express = require("express");
const UserInfo = require('../models/userInfo');
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.post('', checkAuth, (req, res, next) => {
  const info = new UserInfo({
    userName: req.body.userName,
    userWebsite: req.body.userWebsite,
    userLocation: req.body.userLocation
  });

  info.save().then(createdUserInfo => {
    // return a response
    res.status(201).json({
      message: 'Info added successfully',
      info: {
        ...createdUserInfo,
        id: createdUserInfo._id
      }
    });
  })
    .catch(error => {
      res.status(500).json({
        message: "Creating employee information failed!"
      });
    });
});

router.put('/:id', checkAuth, (req, res, next) => {

  const info = new UserInfo({
    _id: req.params.id,
    userName: req.body.userName,
    userWebsite: req.body.userWebsite,
    userLocation: req.body.userLocation
  });

  // the id matches ':/id'
  // second object is the new object we want to store
  UserInfo.updateOne({ _id: req.params.id }, info).then(result => {
    res.status(200).json({messagge: "Update successful!"});
  })
})

router.get('', (req, res, next) => {
  // use UserInfo model and a static method (find) again to find the info
  // then block holds results
  UserInfo.find()
    .then(documents => {
      res.status(200).json({
      message: "fetched successfully",
      userInfo: documents
      });
    });
});

router.get('/:id', (req, res, next) => {
  UserInfo.findById(req.params.id).then(info => {
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
  UserInfo.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({message: "Info deleted!"});
  });
});

module.exports = router;

