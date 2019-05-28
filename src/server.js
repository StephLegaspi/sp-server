//import packages
const express = require("express");
const bodyParser = require('body-parser');
const logger = require('morgan')

//import database configuration
const db = require('./database/index');
const routes = require('./router');

//middleware between frontend and backend
const app = express();

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

//declare port where the server will run
var port =  3001;

//get the routes
app.use('/v1', routes)
app.listen(port, function() {
  console.log('Server running in '+ port);
});