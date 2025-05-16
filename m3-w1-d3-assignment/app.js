const express = require('express');
const path = require('path');
const routes = require('./routes/index'); 

const app = express();

// Set up middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/', routes);

module.exports = app;