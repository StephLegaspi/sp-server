'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');

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

router.get('/products', async (req, res) => {
  try {
    const products = await controller.getAll();
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



router.post('/products', async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
    
    try {
      const product = await controller.create(name, description, price);
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
    
    try {
      const product = await controller.edit(id, name, description, price);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited product',
        data: product
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});



module.exports = router;