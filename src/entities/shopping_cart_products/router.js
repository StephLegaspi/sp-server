'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


router.post('/shopping_cart_products', async (req, res) => {
  const product_quantity = req.body.product_quantity;
  const product_color_id = req.body.product_color_id;
  const shopping_cart_id = req.body.shopping_cart_id;
  const product_id = req.body.product_id;
    
    try {
      const shopping_cart_product = await controller.create(product_quantity, product_color_id, shopping_cart_id, product_id);
      res.status(200).json({
        status: 200,
        message: 'Successfully created shopping_cart_product',
        data: shopping_cart_product
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.get('/shopping_cart_products', async (req, res) => {
  try {
    const shopping_cart_products = await controller.getAll();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched shopping_cart_products',
      data: shopping_cart_products
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.get('/shopping_cart_products/:id', async (req, res) => {
  try {
    const shopping_cart_product = await controller.getOne(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched shopping_cart_products',
      data: shopping_cart_product
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.delete('/shopping_cart_products/:id', async (req, res) => {
  try {
    const shopping_cart_product = await controller.remove(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted shopping_cart_product',
      data: shopping_cart_product
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

module.exports = router;