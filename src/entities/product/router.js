'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');

router.get('/products/purchase', async (req, res) => {
  try {
    const products = await controller.getAllPurchase();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched products',
      data: products
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.get('/products/rental', async (req, res) => {
  try {
    const products = await controller.getAllRental();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched products',
      data: products
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});


router.get('/products/:id', async (req, res) => {
  try {
    const product = await controller.getOne(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched product',
      data: product
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});



router.post('/products', async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const for_purchase = req.body.for_purchase;
  const display_product = req.body.display_product;
  const total_quantity = req.body.total_quantity;
  const admin_id = req.body.admin_id;
  const user_id = req.session.user.id;
    
    try {
      const product = await controller.create(user_id, name, description, price, for_purchase, display_product, total_quantity, admin_id);
      res.status(200).json({
        status: 200,
        message: 'Successfully created product',
        data: product
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.put('/products/:id', async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const for_purchase = req.body.for_purchase;
  const display_product = req.body.display_product;
  const total_quantity = req.body.total_quantity;
  const user_id = req.session.user.id;

    try {
      const product = await controller.edit(user_id, id, name, description, price, for_purchase, display_product, total_quantity);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited product',
        data: product
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.put('/products/disable/:id', async (req, res) => {
  const id = req.params.id;
  const user_id = req.session.user.id;

    try {
      const product = await controller.disable(user_id, id, 0);
      res.status(200).json({
        status: 200,
        message: 'Successfully disabled product',
        data: product
      });
    } catch (status) {
      res.status(status).json({ status });
    } 
});

router.put('/products/enable/:id', async (req, res) => {
  const id = req.params.id;
  const user_id = req.session.user.id;
    
    try {
      const product = await controller.enable(user_id, id, 1);
      res.status(200).json({
        status: 200,
        message: 'Successfully enabled product',
        data: product
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.delete('/products/:id', async (req, res) => {
  const user_id = req.session.user.id;

  try {
    const product = await controller.remove(user_id, req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted product',
      data: product
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});


module.exports = router;