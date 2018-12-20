'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


router.post('/requests', async (req, res) => {
  const customer_first_name = req.body.customer_first_name;
  const customer_middle_name = req.body.customer_middle_name;
  const customer_last_name = req.body.customer_last_name;
  const customer_email = req.body.customer_email;
  const customer_contact_number = req.body.customer_contact_number;
  const event_date = req.body.event_date;
  const event_location = req.body.event_location;
  const number_of_persons = req.body.number_of_persons;
  const package_id = req.body.package_id;
  const motif_id = req.body.motif_id;
  const menu_id = req.body.menu_id;
  const customer_id = req.body.customer_id;
 
    
    try {
      const request_info = await controller.create(customer_first_name, customer_middle_name, customer_last_name, customer_email, customer_contact_number, event_date, event_location, number_of_persons, package_id, motif_id, menu_id, customer_id);
      res.status(200).json({
        status: 200,
        message: 'Successfully created request',
        data: request_info
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.get('/requests', async (req, res) => {
  try {
    const request_info = await controller.getAll();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched requests',
      data: request_info
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.get('/requests/:id', async (req, res) => {
  try {
    const request_info = await controller.getOne(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched requests',
      data: request_info
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.delete('/requests/:id', async (req, res) => {
  try {
    const request_info = await controller.remove(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted request',
      data: request_info
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.put('/requests/:id', async (req, res) => {
  const id = req.params.id;
  const customer_first_name = req.body.customer_first_name;
  const customer_middle_name = req.body.customer_middle_name;
  const customer_last_name = req.body.customer_last_name;
  const customer_email = req.body.customer_email;
  const customer_contact_number = req.body.customer_contact_number;
  const event_date = req.body.event_date;
  const event_location = req.body.event_location;
  const number_of_persons = req.body.number_of_persons;
  const package_id = req.body.package_id;
  const motif_id = req.body.motif_id;
  const menu_id = req.body.menu_id;
  const customer_id = req.body.customer_id;

    try {
      const request_info = await controller.edit( id, customer_first_name, customer_middle_name, customer_last_name, customer_email, customer_contact_number, event_date, event_location, number_of_persons, package_id, motif_id, menu_id, customer_id);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited request',
        data: request_info
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

module.exports = router;