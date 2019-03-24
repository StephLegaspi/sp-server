'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const nodemailer = require("nodemailer");

const async = require('asyncawait/async');
const await = require('asyncawait/await');

router.post('/inquiry', async (req, res) => {
  const first_name = req.body.first_name;
  const middle_name = req.body.middle_name;
  const last_name = req.body.last_name;
  const email_address = req.body.email_address;
  const contact_number = req.body.contact_number;
  const message = req.body.message;

  const full_name = first_name+' '+middle_name+' '+last_name;

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
      user: 'steph061099@gmail.com',
      pass: 'twilightsaga1' 
    }
  });

  let mailOptions = {
    from: '"Stephanie Legaspi" <steph061099@gmail.com>', 
    to: email_address, 
    subject: "(LJPNCS) Inquiry from: " + full_name, 
    text: contact_number +'\n'+ message, 
    html: "<b>" +contact_number +'<br/>'+ message+ "</b>" 
  };
 
  transporter.sendMail(mailOptions, (error, info) => {
    try {
      return console.log('Message %s sent: %s', info.messageId, info.response);
    } catch (status) {
      return console.log(error);
    }  
  });

});

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
  const session_id = 1;

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