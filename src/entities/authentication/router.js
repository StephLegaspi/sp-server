'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const generator = require('generate-password');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


router.post('/auth/login/admin', async (req, res) => {
  const email_address = req.body.email_address;
  const password = req.body.password;
 
    try {
    	let user = await controller.loginAdmin(email_address, password);

    	res.status(200).json({
	        status: 200,
	        message: 'Successfully logged in',
	        data: user
    	});
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.post('/auth/login/customer', async (req, res) => {
  const email_address = req.body.email_address;
  const password = req.body.password;
 
    try {
      const user = await controller.loginCustomer(email_address, password);

      //req.session.user = user;
      res.status(200).json({
          status: 200,
          message: 'Successfully logged in',
          data: user
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.get('/auth/reset-password/:email_address', async (req, res) => {
  const new_password = generator.generate({
    length: 10,
    numbers: true
  });
 
    try {
      await controller.findEmail(req.params.email_address);
      await controller.resetPassword(req.params.email_address, new_password);
      let auth = await controller.editPasswordByEmail(req.params.email_address, new_password);

      res.status(200).json({
          status: 200,
          message: 'Successfully reset password',
          data: auth
      });
    }catch (status) {
      let message = '';

      switch (status) {
        case 404:
          message = 'Email not found';
          break;
        case 500:
          message = 'Internal server error';
          break;
      }
      res.status(status).json({ status, message });
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