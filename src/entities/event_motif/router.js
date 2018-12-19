'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


router.post('/event_motifs', async (req, res) => {
  const description = req.body.description;
    
    try {
      const event_motif = await controller.create(description);
      res.status(200).json({
        status: 200,
        message: 'Successfully created event motif',
        data: event_motif
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

module.exports = router;