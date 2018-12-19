'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


router.post('/products/color', async (req, res) => {
  const product_color = req.body.product_color;
  const product_id = req.body.product_id;
    
    try {
      const product = await controller.create(product_color, product_id);
      res.status(200).json({
        status: 200,
        message: 'Successfully added product color',
        data: product
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.get('/products/:id/color', async (req, res) => {
  try {
    const products = await controller.getAll(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched product colors',
      data: products
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.delete('/products/:id/color', async (req, res) => {
  try {
    const product = await controller.remove(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted product color',
      data: product
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});



module.exports = router;