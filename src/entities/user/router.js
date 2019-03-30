'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authController = require('../authentication/controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


router.get('/users', async (req, res) => {
  try {
    const users = await controller.getAll();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched users',
      data: users
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await controller.getOne(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched user',
      data: user
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.put('/users/:id', async (req, res) => {
  const id = req.params.id;
  const first_name = req.body.first_name;
  const middle_name = req.body.middle_name;
  const last_name = req.body.last_name;
  const email_address = req.body.email_address;
  const contact_number = req.body.contact_number;
  const session_id = req.session.user.id;
    
    try {
      const user = await controller.edit(session_id, id, first_name, middle_name, last_name, email_address, contact_number );
      res.status(200).json({
        status: 200,
        message: 'Successfully edited user',
        data: user
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.put('/users/change_password/:id', async (req, res) => {
  const id = req.params.id;
  const email_address = req.body.email_address;
  const old_password = req.body.old_password;
  const new_password = req.body.new_password;
  const confirm_password = req.body.confirm_password;
  const session_id = 1;
    
    try {
      await authController.checkEmailPass(email_address, old_password, session_id);
      const user = await controller.editPassword(session_id, id, new_password, confirm_password);
      res.status(200).json({
        status: 200,
        message: 'Successfully changed user password',
        data: user
      });
    } catch (status) {
      let message = '';

      switch (status) {
        case 404:
          message = 'Email address or password does not exist';
          break;
        case 500:
          message = 'Internal server error';
          break;
      }
      res.status(status).json({ status, message });
    }
 
});

module.exports = router;