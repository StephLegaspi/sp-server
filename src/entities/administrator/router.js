'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


router.post('/administrators', async (req, res) => {
  const user_id = req.body.user_id;
    
    try {
      const administrator = await controller.create(user_id);
      res.status(200).json({
        status: 200,
        message: 'Successfully created administrator',
        data: administrator
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.get('/administrators', async (req, res) => {
  try {
    const administrators = await controller.getAll();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched administrators',
      data: administrators
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.get('/administrators/:id', async (req, res) => {
  try {
    const administrator = await controller.getOne(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched administrator',
      data: administrator
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.delete('/administrators/:id', async (req, res) => {
  try {
    const administrator = await controller.remove(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted administrator',
      data: administrator
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

module.exports = router;