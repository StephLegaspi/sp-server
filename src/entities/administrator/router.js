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


module.exports = router;