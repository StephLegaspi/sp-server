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

router.put('/users/:id', async (req, res) => {
  const id = req.params.id;
  const first_name = req.body.first_name;
  const middle_name = req.body.middle_name;
  const last_name = req.body.last_name;
  const email_address = req.body.email_address;
  const password = req.body.password;
  const contact_number = req.body.contact_number;
    
    try {
      const user = await controller.edit(id, first_name, middle_name, last_name, email_address, password, contact_number );
      res.status(200).json({
        status: 200,
        message: 'Successfully edited user',
        data: user
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

module.exports = router;