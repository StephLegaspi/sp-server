const express = require("express");
const bodyParser = require('body-parser');
const logger = require('morgan')
const session = require('express-session');
const store = require('express-mysql-session');

const db = require('./database/index');
const routes = require('./router');

const app = express();
const MySQLStore = store(session);
const sessionStore = new MySQLStore({}, db);
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors());

app.options('*', cors());

app.use(
  session({
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
);

app.use('/v1', routes)
app.listen(3000);