'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


router.post('/shopping_carts/purchase', async (req, res) => {
  const session_id = req.body.session_id;
  const for_purchase = 1;
    
    try {
      const shopping_cart = await controller.create(session_id, for_purchase);
      res.status(200).json({
        status: 200,
        message: 'Successfully created shopping_cart',
        data: shopping_cart
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.post('/shopping_carts/rental', async (req, res) => {
  const session_id = req.body.session_id;
  const for_purchase = 0;
    
    try {
      const shopping_cart = await controller.create(session_id, for_purchase);
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


router.get('/shopping_carts/purchase/:id', async (req, res) => {
  try {
    const shopping_cart = await controller.getOnePurchase(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched shopping_cart',
      data: shopping_cart
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.get('/shopping_carts/rental/:id', async (req, res) => {
  try {
    const shopping_cart = await controller.getOneRental(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched shopping_cart',
      data: shopping_cart
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.put('/shopping_carts/rental-duration/:id', async (req, res) => {
  const id = req.params.id;
  const rental_duration = req.body.rental_duration;
    try {
      const order_info = await controller.editRentalDuration(id, rental_duration);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited order',
        data: order_info
      });
    } catch (status) {
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

  try {
    const shopping_cart = await controller.remove(req.params.id);
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