'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

//package for image upload
const multer = require('multer');
//declares image destination
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/motifs');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname);
  }
})
//filters image
const imageFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  }else{
    cb(null, false);
  }
}
const upload = multer({
  storage: storage,
  fileFilter: imageFilter
})

const async = require('asyncawait/async');
const await = require('asyncawait/await');

//creates event motif
router.post('/event_motifs', upload.array('images', 5), async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const session_id = req.body.session_id;

  let image_files = ''
  let i;
  
  image_files = image_files + req.files[0].path;
  for(i=1; i<5; i++){
    image_files = image_files + '|' + req.files[i].path;
  }

  image_files = image_files + '|';

    try {
      const event_motif = await controller.create(session_id, name, description, image_files);
      res.status(200).json({
        status: 200,
        message: 'Successfully created event motif',
        data: event_motif
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

//gets event motif by name
router.get('/event_motifs/search/:name', async (req, res) => {
  try {
    const event_motif = await controller.searchName(req.params.name);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched package event motif',
      data: event_motif
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//gets the first four event motifs
router.get('/event_motifs/four', async (req, res) => {
  try {
    const event_motifs = await controller.getAllFour();
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

//gets all event motifs
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

//gets all motif names
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

//gets motif by ID
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

//deletes motif
router.delete('/event_motifs/:id', async (req, res) => {
  const session_id = req.body.session_id;
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

//edits motif
router.put('/event_motifs/:id', async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  const session_id = req.body.session_id;

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