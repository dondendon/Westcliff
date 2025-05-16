const path = require('path');
const auth = require('http-auth');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Registration = mongoose.model('Registration'); // This should work now
const {check, validationResult} = require('express-validator');
const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', function(req, res){
	//res.send('It works!');
	//res.render('form');
	res.render('form', {title: 'Registration Form'});
});
router.get('/registrations', basic.check((req, res) => {
	Registration.find()
	.then((registrations) => {
	res.render('index', {title: 'Listing Registrations', registrations});
	})
	.catch(()=> {res.send('Sorry! Something went wrong.');});
}));

/*
router.post('/', function(req, res){
	console.log(req.body);
	res.render('form', {title: 'Registration Form'});
});*/

router.post('/',
	[
	check('name')
		.isLength({ min: 1 })
		.withMessage('Please enter a name'),
	check('email')
		.isLength({ min: 1 })
		.withMessage('Please enter an email'),
	],
	function(req, res){
	const errors = validationResult(req);
	if (errors.isEmpty()){
		const registration = new Registration(req.body);
		registration.save()
			.then(() => {res.send('Thank you for your registration!');})
			.catch((err) => {
				console.log(err);
				res.send('Sorry! Something went wrong.');
			})
		//res.send('Thanks for your registration!');
	}else{
		res.render('form',{
			title: 'Registration form',
			errors: errors.array(),
			data: req.body,
		});
	}
});

module.exports = router;