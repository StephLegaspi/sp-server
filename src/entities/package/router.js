'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');

//creates package
router.post('/packages', async (req, res) => {
  const name = req.body.name;
  const inclusion = req.body.inclusion;
  const price = req.body.price;
  const session_id = req.body.session_id;
    
    try {
      const catering_package = await controller.create(session_id, name, inclusion, price);
      res.status(200).json({
        status: 200,
        message: 'Successfully created package',
        data: catering_package
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

//gets all packages
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

//gets the first three packages
router.get('/packages/three', async (req, res) => {
  try {
    const catering_packages = await controller.getThree();
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

//gets all packages by name
router.get('/packages/names', async (req, res) => {
  try {
    const catering_packages = await controller.getAllNames();
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

//gets package inclusions by package ID
router.get('/packages/inclusions/:id', async (req, res) => {
  try {
    const catering_package = await controller.getOneInclusion(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched package inclusions',
      data: catering_package
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//gets package by name
router.get('/packages/search/:name', async (req, res) => {
  try {
    const catering_package = await controller.searchName(req.params.name);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched package inclusions',
      data: catering_package
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//gets package by ID
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

//deletes package
router.delete('/packages/:id', async (req, res) => {
  const session_id = req.body.session_id;

  try {
    const catering_package = await controller.remove(session_id, req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted package',
      data: catering_package
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//edits package
router.put('/packages/:id', async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const inclusion = req.body.inclusion;
  const price = req.body.price;
  const session_id = req.body.session_id;

    try {
      const catering_package = await controller.edit(session_id, name, inclusion, price, id);
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