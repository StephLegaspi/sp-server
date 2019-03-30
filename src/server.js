const express = require("express");
const bodyParser = require('body-parser');
const logger = require('morgan')
const session = require('express-session');
const cookieParser = require('cookie-parser');
//const store = require('express-mysql-session');
const TWO_HOURS = 1000 * 60 *60 * 2;

const db = require('./database/index');
const routes = require('./router');

const{
  SESS_LIFETIME = TWO_HOURS
} = process.env

const app = express();
//const MySQLStore = store(session);
//const sessionStore = new MySQLStore({}, db);
/*app.use(session({
    key: 'transactionserver',
    secret: 'transactionserver',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
    store: sessionStore,
    createDatabaseTable: true,
    checkExpirationInterval: 900000,
    expiration: 86400000
  })
);*/
app.use(cookieParser());

app.use(session({
    key: 'transactionserver',
    secret: 'transactionserver',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: false 
    }
  })
);


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



app.use('/v1', routes)
app.listen(3001);