'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');

router.post('/users', async (req, res) => {
  const first_name = req.body.first_name;
  const middle_name = req.body.middle_name;
  const last_name = req.body.last_name;
  const email_address = req.body.email_address;
  const password = req.body.password;
  const contact_number = req.body.contact_number;
    
    try {
      const user = await controller.create(first_name, middle_name, last_name, email_address, password, contact_number);
      res.status(200).json({
        status: 200,
        message: 'Successfully created user',
        data: user
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.post('/auth/login', async (req, res) => {
  const email_address = req.body.email_address;
  const password = req.body.password;
 
    try {
    	const user = await controller.login(email_address, password);

   		req.session.user = user;
	    if (req.session.user) {
	        //var firstName = req.session.user.first_name.split(' ');
	       req.session.user['first_name'] = req.session.user.first_name;
	       //console.log(req.session.user['first_name']);
		} 

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