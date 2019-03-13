'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');

router.get('/inventories-purchase/search/:name', async (req, res) => {
  try {
    const inventory = await controller.searchNamePurchase(req.params.name);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched inventory',
      data: inventory
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.get('/inventories-rental/search/:name', async (req, res) => {
  try {
    const inventory = await controller.searchNameRental(req.params.name);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched inventory',
      data: inventory
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.get('/inventories/purchase/out-of-stock', async (req, res) => {
  try {
    const inventory = await controller.getOutOfStockPurchase();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched inventory',
      data: inventory
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.get('/inventories/rental/out-of-stock', async (req, res) => {
  try {
    const inventory = await controller.getOutOfStockRental();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched inventory',
      data: inventory
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.get('/inventories/purchase/out-of-stock-count', async (req, res) => {
  try {
    const inventory = await controller.getOutOfStockPurchaseCount();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched inventory',
      data: inventory
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.get('/inventories/rental/out-of-stock-count', async (req, res) => {
  try {
    const inventory = await controller.getOutOfStockRentalCount();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched inventory',
      data: inventory
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.get('/inventories/purchase', async (req, res) => {
  try {
    const inventories = await controller.getAllPurchase();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched inventories',
      data: inventories
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.get('/inventories/rental', async (req, res) => {
  try {
    const inventories = await controller.getAllRental();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched inventories',
      data: inventories
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.get('/inventories/:id', async (req, res) => {
  try {
    const inventory = await controller.getByID(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched inventory',
      data: inventory
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.get('/inventories/purchase/name/:name', async (req, res) => {
  try {
    const inventory = await controller.getByProdNamePurchase(req.params.name);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched inventory',
      data: inventory
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.get('/inventories/rental/name/:name', async (req, res) => {
  try {
    const inventory = await controller.getByProdNameRental(req.params.name);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched inventory',
      data: inventory
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.put('/inventories/:id', async (req, res) => {
  const id = req.params.id;
  const total_quantity = req.body.total_quantity;
  const session_id = 1;

    try {
      const inventory = await controller.edit(session_id, id, total_quantity);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited inventory',
        data: inventory
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

module.exports = router;