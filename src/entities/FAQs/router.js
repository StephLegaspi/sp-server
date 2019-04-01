'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


router.post('/FAQs', async (req, res) => {
  const question = req.body.question;
  const answer = req.body.answer;
  const session_id = req.body.session_id;
    
    try {
      const faq = await controller.create(session_id, question, answer);
      res.status(200).json({
        status: 200,
        message: 'Successfully created FAQ',
        data: faq
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.get('/FAQs', async (req, res) => {
  try {
    const faq = await controller.getAll();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched FAQs',
      data: faq
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.get('/FAQs/:question', async (req, res) => {
  try {
    const FAQ = await controller.getOne(req.params.question);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched FAQ',
      data: FAQ
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});


router.delete('/FAQs/:id', async (req, res) => {
  const session_id = req.body.session_id;
  try {
    const faq = await controller.remove(session_id, req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted FAQ',
      data: faq
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

router.put('/FAQs/:id', async (req, res) => {
  const id = req.params.id;
  const question = req.body.question;
  const answer = req.body.answer;
  const session_id = req.body.session_id;

    try {
      const faq = await controller.edit(session_id, id, question, answer );
      res.status(200).json({
        status: 200,
        message: 'Successfully edited FAQ',
        data: faq
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