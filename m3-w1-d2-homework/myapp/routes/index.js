const express = require('express');
const router = express.Router();

// Display the form
router.get('/', (req, res) => {
  res.render('form', { title: 'Form Page', data: {}, errors: null });
});

// Handle form POST
router.post('/', (req, res) => {
  const { name, email } = req.body;
  const errors = [];

  if (!name || name.trim() === '') {
    errors.push({ msg: 'Name is required' });
  }

  if (!email || email.trim() === '') {
    errors.push({ msg: 'Email is required' });
  }

  if (errors.length > 0) {
    res.render('form', {
      title: 'Form Page',
      errors,
      data: { name, email }
    });
  } else {
    // Normally you'd save to a DB here
    res.send(`Thanks, ${name}! Your email is ${email}`);
  }
});

module.exports = router;