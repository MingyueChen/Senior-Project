const express = require("express");
// import bcrypt to hash passwords
const bcryptjs = require ('bcryptjs');
const saltRounds = 10;
// import the admin mode
const Admin = require ("../models/admin");

const router = express.Router();
router.post("/signup", (req, res, next) => {
bcryptjs.genSalt(saltRounds, function(err, salt) {
  bcryptjs.hash(req.body.password, saltRounds, function(err, hash) {
    const admin = new Admin ({
      email: req.body.email,
      password: hash
    }); // end of create admin model
    admin.save()
      .then (result => {
        res.status(201).json({
          message: 'Admin created!',
          result: result
        }); // end of status(201)
      }) // end of then
      .catch (err => {
        res.status(500).json({
          error: err
        }); // end of status(500)
      }); // end of catch
    }); // end of bcryptjs.hash
  }); // bcryptjs.genSalt
}); // end of router.post

module.exports = router;
