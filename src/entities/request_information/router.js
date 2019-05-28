'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authController = require('../authentication/controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');

//creates a request
router.post('/requests-one/:id', async (req, res) => {
  const status = req.body.status;

  try {
    const request_info = await controller.getOne(req.params.id, status);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched requests',
      data: request_info
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//gets count of pending requests
router.get('/requests/pending-count', async (req, res) => {
  try {
    const request_info = await controller.getPendingCount();
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

//gets request by ID
router.get('/requests/:id', async (req, res) => {
  try {
    const request_info = await controller.getOneSimple(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched requests',
      data: request_info
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//creates request
router.post('/requests', async (req, res) => {
  const customer_first_name = req.body.customer_first_name;
  const customer_middle_name = req.body.customer_middle_name;
  const customer_last_name = req.body.customer_last_name;
  const customer_email = req.body.customer_email;
  const customer_contact_number = req.body.customer_contact_number;
  const event_date = req.body.event_date;
  const event_time = req.body.event_time;
  const event_location = req.body.event_location;
  const number_of_persons = req.body.number_of_persons;
  const additional_request = req.body.additional_request;
  const package_id = req.body.package_id;
  const motif_id = req.body.motif_id;
  const menu_id = req.body.menu_id;
  const session_id = req.body.session_id;
 
    
    try {
      await authController.checkValidContact(customer_contact_number);
      await authController.checkValidEmail(customer_email);
      await controller.sendRequest(customer_email, package_id, motif_id, menu_id);
      const request_info = await controller.create(session_id, customer_first_name, customer_middle_name, customer_last_name, customer_email, customer_contact_number, event_date, event_time, event_location, number_of_persons, package_id, motif_id, menu_id, additional_request);

      res.status(200).json({
        status: 200,
        message: 'Successfully created and sent request',
        data: request_info
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

//gets request inclusions
router.get('/requests/inclusion/:id', async (req, res) => {
  try {
    const request_info = await controller.getInclusion(req.params.id);
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

//gets requests
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

//gets requests by status
router.get('/requests/status/:status', async (req, res) => {
  try {
    const request_info = await controller.getByStatus(req.params.status);
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

//deletes request
router.delete('/requests/:id', async (req, res) => {
  const session_id = req.body.session_id;

  try {
    const request_info = await controller.remove(session_id, req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted request',
      data: request_info
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

//edits request
router.put('/requests/:id', async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  const session_id = req.body.session_id;

    try {
      const request_info = await controller.edit(session_id, id, status);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited request',
        data: request_info
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