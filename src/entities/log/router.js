'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');

//gets logs of administrators
router.get('/logs/admin', async (req, res) => {
  try {
    const logs = await controller.getAllAdmin();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched logs',
      data: logs
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

//gets logs of customers
router.get('/logs/customer', async (req, res) => {
  try {
    const logs = await controller.getAllCustomer();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched logs',
      data: logs
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

//gets logs of administrator
router.get('/logs/admin/:id', async (req, res) => {
  try {
    const log = await controller.getOneAdmin(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched log',
      data: log
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//gets logs of customers by ID
router.get('/logs/customer/:id', async (req, res) => {
  try {
    const log = await controller.getOneCustomer(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched log',
      data: log
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//deletes logs
router.delete('/logs/:id', async (req, res) => {
  const session_id = req.body.session_id;
  try {
    const log = await controller.remove(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted log',
      data: log
    });
  } catch (status) {
      let message = '';
      switch (status) {
        case 404:
          message = 'ID not found';
          break;
        case 500:
          message = 'Internal server error';
          break;
      }
      res.status(status).json({ status, message });
  }
});


module.exports = router;