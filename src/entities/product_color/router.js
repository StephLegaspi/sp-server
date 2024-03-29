'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');

//gets product quantity per color
router.get('/product_colors/quantity/:id', async (req, res) => {
  try {
    const products = await controller.getQuantityByID(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched product quantity per color',
      data: products
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//gets product colors
router.get('/product_colors', async (req, res) => {
  try {
    const products = await controller.getAll();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched product colors',
      data: products
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

//gets product color by ID
router.get('/products/colors/:id', async (req, res) => {
  try {
    const products = await controller.getOne(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched product colors',
      data: products
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//edits product quantity of products for purchase
router.put('/product_colors/quantity/purchase/:id', async (req, res) => {
  const product_id = req.params.id;
  const product_quantity = req.body.product_quantity;
  const product_color = req.body.product_color;
  const user_id = req.body.session_id;

    try {
      const product = await controller.edit(product_id, product_quantity, product_color, user_id);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited product color quantity',
        data: product
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

//edits product quantity of products for rental
router.put('/product_colors/quantity/rental/:id', async (req, res) => {
  const product_id = req.params.id;
  const product_quantity = req.body.product_quantity;
  const product_color = req.body.product_color;
  const user_id = req.body.session_id;

    try {
      const product = await controller.editRental(product_id, product_quantity, product_color, user_id);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited product color quantity',
        data: product
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});




module.exports = router;