require('./global_functions');
require('./passport');

const express = require("express");
const app = express();

const passport  = require('passport');
//require('./passport');

const db = require('./database/index');
const routes = require('./router');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use('/v1', routes)
app.listen(3000);