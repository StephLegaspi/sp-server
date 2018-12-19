'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


router.post('/customers', async (req, res) => {
  const address = req.body.address;
  const zip_code = req.body.zip_code;
  const user_id = req.body.user_id;
    
    try {
      const customer = await controller.create(address, zip_code, user_id );
      res.status(200).json({
        status: 200,
        message: 'Successfully created customer',
        data: customer
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
  const user_id = req.body.user_id;

    try {
      const customer = await controller.edit( id, address, zip_code, user_id );
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