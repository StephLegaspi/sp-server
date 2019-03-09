'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


router.post('/event_motifs', async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const session_id = 1;
    
    try {
      const event_motif = await controller.create(session_id, name, description);
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

router.get('/event_motifs/names', async (req, res) => {
  try {
    const event_motifs = await controller.getAllNames();
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
  const session_id = 1;
  try {
    const event_motif = await controller.remove(session_id, req.params.id);
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
  const name = req.body.name;
  const description = req.body.description;
  const session_id = 1;

    try {
      const event_motif = await controller.edit(session_id, id, name, description );
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