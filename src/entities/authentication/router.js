'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


router.post('/auth/login', async (req, res) => {
  const email_address = req.body.email_address;
  const password = req.body.password;
 
    try {
    	const user = await controller.login(email_address, password);

   		req.session.user = user;
    	res.status(200).json({
	        status: 200,
	        message: 'Successfully logged in',
	        data: user
    	});
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.post('/auth/logout', async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({
      status: 200,
      message: 'Successfully logged out'
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

module.exports = router;