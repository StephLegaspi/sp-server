'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


router.get('/logs/admin', async (req, res) => {
  try {
    const logs = await controller.getAllAdmin();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched logs',
      data: logs
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});


module.exports = router;