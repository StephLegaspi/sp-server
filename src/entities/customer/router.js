'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authController = require('../authentication/controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


router.post('/customers', async (req, res) => {
  const first_name = req.body.first_name;
  const middle_name = req.body.middle_name;
  const last_name = req.body.last_name;
  const email_address = req.body.email_address;
  const password = req.body.password;
  const contact_number = req.body.contact_number;
  const user_type = req.body.user_type;
  const address = req.body.address;
  const zip_code = req.body.zip_code;
    
    try {
      await authController.checkValidContact(contact_number);
      await authController.checkValidEmail(email_address);
      await authController.checkEmailExists(email_address);
      const customer = await controller.create(first_name, middle_name, last_name, email_address, password, contact_number, user_type, address, zip_code);
      res.status(200).json({
        status: 200,
        message: 'Successfully created customer',
        data: customer
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

router.get('/customers/profile/:id', async (req, res) => {
  const user_id = req.params.id;

  try {
    const administrator = await controller.getProfile(user_id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched administrator',
      data: administrator
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.get('/customers', async (req, res) => {

  try {
    const customers = await controller.getAll();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched customers',
      data: customers
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.get('/customers/modal/:id', async (req, res) => {
  try {
    const customer = await controller.getOneModal(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched customer',
      data: customer
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.get('/customers/users/:id', async (req, res) => {
  try {
    const customer = await controller.getByUserID(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched customer',
      data: customer
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.get('/customers/:id', async (req, res) => {
  try {
    const customer = await controller.getOne(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched customer',
      data: customer
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.put('/customers/:id', async (req, res) => {
  const id = req.params.id;
  const address = req.body.address;
  const zip_code = req.body.zip_code;
  const session_id = req.body.session_id;

    try {
      const customer = await controller.edit(session_id, id, address, zip_code);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited customer',
        data: customer
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

module.exports = router;