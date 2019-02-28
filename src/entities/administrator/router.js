'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authController = require('../authentication/controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


router.post('/administrators', async (req, res) => {
  const session_id = req.session.user.id;
  const first_name = req.body.first_name;
  const middle_name = req.body.middle_name;
  const last_name = req.body.last_name;
  const email_address = req.body.email_address;
  const password = req.body.password;
  const contact_number = req.body.contact_number;
  const user_type = req.body.user_type;

    try {
      await authController.checkValidContact(contact_number);
      await authController.checkValidEmail(email_address);
      await authController.checkEmailExists(email_address);
      const administrator = await controller.create(session_id, first_name, middle_name, last_name, email_address, password, contact_number, user_type);
      res.status(200).json({
        status: 200,
        message: 'Successfully created administrator',
        data: administrator
      });
    } catch (status) {
      let message = '';

      switch (status) {
        case 400:
          message = 'Invalid email address or contact number';
          break;
        case 406:
          message = 'Email address already exists';
          break;
        case 500:
          message = 'Internal server error';
          break;
      }
      res.status(status).json({ status, message });
    }
 
});

router.get('/administrators', async (req, res) => {
  try {
    const administrators = await controller.getAll();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched administrators',
      data: administrators
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.get('/administrators/:id', async (req, res) => {
  try {
    const administrator = await controller.getOne(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched administrator',
      data: administrator
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.delete('/administrators/:id', async (req, res) => {
  const session_id = req.session.user.id;

  try {
    const administrator = await controller.remove(session_id, req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted administrator',
      data: administrator
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

module.exports = router;