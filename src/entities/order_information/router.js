'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authController = require('../authentication/controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');

//creates order for purchase
router.post('/orders/purchase', async (req, res) => {
  const consignee_first_name = req.body.consignee_first_name;
  const consignee_middle_name = req.body.consignee_middle_name;
  const consignee_last_name = req.body.consignee_last_name;
  const consignee_email = req.body.consignee_email;
  const consignee_contact_number = req.body.consignee_contact_number;
  const delivery_address = req.body.delivery_address;
  const zip_code = req.body.zip_code;
  const rental_duration = 1;
  const for_purchase = 1;
  const shopping_cart_id = req.body.shopping_cart_id;
  const session_id = req.body.session_id;
    
    try {
      await authController.checkValidContact(consignee_contact_number);
      await authController.checkValidEmail(consignee_email);
      const order_info = await controller.create(session_id, consignee_first_name, consignee_middle_name, consignee_last_name, consignee_email, consignee_contact_number, delivery_address, zip_code, for_purchase, shopping_cart_id, rental_duration);
      res.status(200).json({
        status: 200,
        message: 'Successfully created order',
        data: order_info
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

//creates order for rental
router.post('/orders/rental', async (req, res) => {
  const consignee_first_name = req.body.consignee_first_name;
  const consignee_middle_name = req.body.consignee_middle_name;
  const consignee_last_name = req.body.consignee_last_name;
  const consignee_email = req.body.consignee_email;
  const consignee_contact_number = req.body.consignee_contact_number;
  const delivery_address = req.body.delivery_address;
  const zip_code = req.body.zip_code;
  const rental_duration = req.body.rental_duration;
  const for_purchase = 0;
  const shopping_cart_id = req.body.shopping_cart_id;
  const session_id = req.body.session_id;
    
    try {
      await authController.checkValidContact(consignee_contact_number);
      await authController.checkValidEmail(consignee_email);
      const order_info = await controller.create(session_id, consignee_first_name, consignee_middle_name, consignee_last_name, consignee_email, consignee_contact_number, delivery_address, zip_code, for_purchase, shopping_cart_id, rental_duration);
      res.status(200).json({
        status: 200,
        message: 'Successfully created order',
        data: order_info
      });
    } catch (status) {
      let message = '';

      switch (status) {
        case 400:
          message = 'Invalid email address or contact number';
          break;
        case 500:
          message = 'Internal server error';
          break;
      }
      res.status(status).json({ status, message });
    }
 
});

//gets all orders
router.get('/orders', async (req, res) => {
  try {
    const order_info = await controller.getAll();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched orders',
      data: order_info
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

//gets all orders for purchase
router.get('/orders/purchase', async (req, res) => {
  try {
    const order_info = await controller.getAllPurchase();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched orders',
      data: order_info
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

//gets all orders for rental
router.get('/orders/rental', async (req, res) => {
  try {
    const order_info = await controller.getAllRental();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched orders',
      data: order_info
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

//gets count of pending orders for purchase
router.get('/orders/purchase/pending-count', async (req, res) => {
  try {
    const order_info = await controller.getAllPendingPurchase();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched orders',
      data: order_info
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

//gets count of pending orders for rental
router.get('/orders/rental/pending-count', async (req, res) => {
  try {
    const order_info = await controller.getAllPendingRental();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched orders',
      data: order_info
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

//gets order for purchase by delivery status
router.get('/orders/purchase-status/:delivery_status', async (req, res) => {
  try {
    const order_info = await controller.getByStatPurchase(req.params.delivery_status);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched order',
      data: order_info
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//gets order for rental by delivery status
router.get('/orders/rental-status/:rental_status', async (req, res) => {
  try {
    const order_info = await controller.getByRentalStatus(req.params.rental_status);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched order',
      data: order_info
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//gets order for purchase by ID
router.post('/orders/purchase/:id', async (req, res) => {
  const status = req.body.status;

  try {
    const order_info = await controller.getOnePurchase(req.params.id, status);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched order',
      data: order_info
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//gets order for rental by ID
router.post('/orders/rental/:id', async (req, res) => {
  const status = req.body.status;

  try {
    const order_info = await controller.getOneRental(req.params.id, status);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched order',
      data: order_info
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//deletes order for purchase
router.delete('/orders/purchase/:id', async (req, res) => {
  const session_id = req.body.session_id;;

  try {
    const order_info = await controller.removeOrderPurchase(session_id, req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted order',
      data: order_info
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//deletes order for rental
router.delete('/orders/rental/:id', async (req, res) => {
  const session_id = req.body.session_id;;

  try {
    const order_info = await controller.removeOrderRental(session_id, req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted order',
      data: order_info
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//edits order for purchase
router.put('/orders/purchase/:id', async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  const session_id = req.body.session_id;

    try {
      const order_info = await controller.edit(session_id, id, status);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited order',
        data: order_info
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});


module.exports = router;