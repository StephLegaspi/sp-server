'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


router.post('/shopping_carts', async (req, res) => {
  const customer_id = req.body.customer_id;
    
    try {
      const shopping_cart = await controller.create(customer_id);
      res.status(200).json({
        status: 200,
        message: 'Successfully created shopping_cart',
        data: shopping_cart
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.get('/shopping_carts', async (req, res) => {
  try {
    const shopping_carts = await controller.getAll();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched shopping_carts',
      data: shopping_carts
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});


router.get('/shopping_carts/:id', async (req, res) => {
  try {
    const shopping_cart = await controller.getOne(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched shopping_cart',
      data: shopping_cart
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.delete('/shopping_carts/:id', async (req, res) => {
  const session_id = req.session.user.id;

  try {
    const shopping_cart = await controller.remove(session_id, req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted shopping_cart',
      data: shopping_cart
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});


module.exports = router;