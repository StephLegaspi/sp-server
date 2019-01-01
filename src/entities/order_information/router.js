'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


router.post('/orders', async (req, res) => {
  const consignee_first_name = req.body.consignee_first_name;
  const consignee_middle_name = req.body.consignee_middle_name;
  const consignee_last_name = req.body.consignee_last_name;
  const consignee_email = req.body.consignee_email;
  const consignee_contact_number = req.body.consignee_contact_number;
  const delivery_address = req.body.delivery_address;
  const zip_code = req.body.zip_code;
  const for_purchase = req.body.for_purchase;
  const shopping_cart_id = req.body.shopping_cart_id;
  const customer_id = req.body.customer_id;
  const session_id = req.session.user.id;
    
    try {
      const order_info = await controller.create(session_id, consignee_first_name, consignee_middle_name, consignee_last_name, consignee_email, consignee_contact_number, delivery_address, zip_code, for_purchase, shopping_cart_id, customer_id);
      res.status(200).json({
        status: 200,
        message: 'Successfully created order',
        data: order_info
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.get('/orders', async (req, res) => {
  try {
    const order_info = await controller.getAll();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched orders',
      data: order_info
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.get('/orders/:id', async (req, res) => {
  try {
    const order_info = await controller.getOne(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched order',
      data: order_info
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.delete('/orders/:id', async (req, res) => {
  const session_id = req.session.user.id;

  try {
    const order_info = await controller.remove(session_id, req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted order',
      data: order_info
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.put('/orders/:id', async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  const session_id = req.session.user.id;

    try {
      const order_info = await controller.edit(session_id, id, status);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited order',
        data: order_info
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});


module.exports = router;