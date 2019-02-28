'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');

router.get('/contact_details', async (req, res) => {
  try {
    const contact_details = await controller.getAll();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched contact_details',
      data: contact_details
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.put('/contact_details', async (req, res) => {
  const id = req.params.id;
  const telephone_number = req.body.telephone_number;
  const mobile_number = req.body.mobile_number;
  const email_address = req.body.email_address;
  const business_address = req.body.business_address;
  const session_id = req.session.user.id;

    try {
      const contact = await controller.edit(session_id, telephone_number, mobile_number, email_address, business_address);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited contact details',
        data: contact
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

module.exports = router;