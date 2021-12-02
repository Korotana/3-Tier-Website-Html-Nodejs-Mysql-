const path = require('path');

const express = require('express');
const session = require("express-session");
const db = require('./data/database');
var MySQLStore = require('express-mysql-session')(session);

const demoRoutes = require('./routes/demo');

const app = express();
var sessionStore = new MySQLStore({},db);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session({
  key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}))

app.use(demoRoutes);

// app.use(function(error, req, res, next) {
//   res.render('500');
// })

PORT = 8000;
app.listen(PORT);
console.log("Listening to the port " + PORT);

