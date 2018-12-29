'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');

//const passport          = require('passport');
//require('../../passport')(passport);

//const requireAuth = passport.authenticate('jwt', {session: false});

router.post('/packages', async (req, res) => {
  const inclusion = req.body.inclusion;
    
    try {
      const catering_package = await controller.create(inclusion);
      res.status(200).json({
        status: 200,
        message: 'Successfully created package',
        data: catering_package
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.get('/packages', async (req, res) => {
  try {
    const catering_packages = await controller.getAll();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched packages',
      data: catering_packages
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.get('/packages/:id', async (req, res) => {
  try {
    const catering_package = await controller.getOne(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched package',
      data: catering_package
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.delete('/packages/:id', async (req, res) => {
  try {
    const catering_package = await controller.remove(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted package',
      data: catering_package
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.put('/packages/:id', async (req, res) => {
  const id = req.params.id;
  const inclusion = req.body.inclusion;

    try {
      const catering_package = await controller.edit( id, inclusion);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited package',
        data: catering_package
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

module.exports = router;