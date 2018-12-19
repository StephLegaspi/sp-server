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

router.get('/event_motifs', async (req, res) => {
  try {
    const event_motifs = await controller.getAll();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched event motifs',
      data: event_motifs
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.get('/event_motifs/:id', async (req, res) => {
  try {
    const event_motif = await controller.getOne(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched event motif',
      data: event_motif
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.delete('/event_motifs/:id', async (req, res) => {
  try {
    const event_motif = await controller.remove(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted event motif',
      data: event_motif
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.put('/event_motifs/:id', async (req, res) => {
  const id = req.params.id;
  const description = req.body.description;

    try {
      const event_motif = await controller.edit( id, description );
      res.status(200).json({
        status: 200,
        message: 'Successfully edited event motif',
        data: event_motif
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

module.exports = router;