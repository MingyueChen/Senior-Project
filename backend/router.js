const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const router = express();

// Static folder
router.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/src/app/contactUs', (req, res) => {
  res.render('contactUs');
});

router.post('/send', (req, res) => {
  console.log(req.body);
});

module.exports = router;