'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');

//gets rental information of all orders for rental
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

//gets count of rentals that are already due
router.get('/order_rentals/due-count', async (req, res) => {
  try {
    const order_rentals = await controller.getRentalDueCount();
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

//gets rental information of orders for rental by ID
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

//edits rental orders
router.put('/orders/rental/:id', async (req, res) => {
  const session_id = req.body.session_id;
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

//deletes rental order
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