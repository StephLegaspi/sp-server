'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


router.get('/inventories', async (req, res) => {
  try {
    const inventories = await controller.getAll();
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
    const inventory = await controller.getOne(req.params.id);
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
  const remaining = req.body.remaining;
  const session_id = req.session.user.id;

    try {
      const inventory = await controller.edit(session_id, id, total_quantity, remaining);
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