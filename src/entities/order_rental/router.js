'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');

router.get('/order_rentals', async (req, res) => {
  try {
    const order_rentals = await controller.getAll();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched order_rentals',
      data: order_rentals
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.get('/order_rentals/limit/:id', async (req, res) => {
  try {
    const order_rental = await controller.getOneLimit(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched order_rental',
      data: order_rental
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.get('/order_rentals/:id', async (req, res) => {
  try {
    const order_rental = await controller.getOne(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched order_rental',
      data: order_rental
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.put('/orders/rental/:id', async (req, res) => {
  const session_id = 1;
  const id = req.params.id;
  const rental_status = req.body.rental_status;

    try {
      const order_rental = await controller.edit(session_id, id, rental_status);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited order_rental',
        data: order_rental
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.delete('/order_rentals/:id', async (req, res) => {
  try {
    const order_rental = await controller.remove(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted order_rental',
      data: order_rental
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

module.exports = router;