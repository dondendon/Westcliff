const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const auth = require('http-auth');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const Registration = mongoose.model('Registration');

const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', (req, res) => {
  res.render('index', { title: 'Simple Kitchen' });
});

router.get('/register', (req, res) => {
  res.render('form', { title: 'Registration form' });
});

router.get(
  '/registrants',
  (req, res, next) => {
    basic.check(() => next())(req, res);
  },
  (req, res) => {
    Registration.find()
      .then((registrations) => {
        res.render('registrants', {
          title: 'Listing registrations',
          registrations,
        });
      })
      .catch((err) => {
        console.error(err);
        res.send('Sorry! Something went wrong.');
      });
  }
);


router.post(
  '/register',
  [
    check('name').isLength({ min: 1 }).withMessage('Please enter a name'),
    check('email').isLength({ min: 1 }).withMessage('Please enter an email'),
    check('username').isLength({ min: 1 }).withMessage('Please enter a user name'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log('req.body:', req.body);
    console.log('Password received:', req.body.password);
    if (errors.isEmpty()) {
      try {
        const registration = new Registration(req.body);
        const salt = await bcrypt.genSalt(10);
        registration.password = await bcrypt.hash(req.body.password, salt);
        await registration.save();

        res.render('thankyou', { title: 'Thank you for your registration!' });
      } catch (err) {
        console.error(err);
        res.send('Sorry! Something went wrong.');
      }
    } else {
      res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

module.exports = router;
