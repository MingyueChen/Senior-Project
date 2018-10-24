const express = require("express");
// import bcrypt to hash passwords
const bcryptjs = require ('bcryptjs');
// import jsonwebtoken
const jwt = require("jsonwebtoken");

const saltRounds = 10;
// import the admin mode
const Admin = require ("../models/admin");

const router = express.Router();

// signup route
router.post("/signup", (req, res, next) => {
//hash a password
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

// login route
router.post("/login", (req, res, next) => {
  let fetchedAdmin;
  // try to find a matching email address
  Admin.findOne({email: req.body.email})
    .then (admin => {
      // if a user does not exist
      if (!admin) {
        // status is 401 because the authentication is denied
        return res.status(401).json({
          message: "Auth failed"
        });
      } // end of if
      // notice that in line 43, we returned and we did not do
      // it earlier because I will now add code after the if
      // statement

      // we do find a user
      // compared the passwords stored in the database with user inputs
      // return a promoise, so I can just return to a response, a result of thaht compare operation
      fetchedAdmin = admin;
      // then chain another then call
      return bcryptjs.compare(req.body.password,admin.password);
    }) // end of findOne.then
    .then (result => {
      // we do not have a successful match
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      } // end of if (!result)
      // we have a successful match and create a json web token
      const token = jwt.sign(
        {email: fetchedAdmin.email, adminID: fetchedAdmin._id},
        "secret_pw_kattell_and_company_mrcx020996",
        {expiresIn: "1h"}
      ); // end of sign
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    }) // end of .then (result => {
    .catch (err => {
      return res.status(401).json({
        message: "Auth failed"
      });

    }) // end of .catch (err => {
});

module.exports = router;
