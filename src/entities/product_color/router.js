'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


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



module.exports = router;