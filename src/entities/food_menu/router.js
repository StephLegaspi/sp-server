'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');


router.post('/food_menus', async (req, res) => {
  const description = req.body.description;
  const session_id = req.session.user.id;
    
    try {
      const food_menu = await controller.create(session_id, description);
      res.status(200).json({
        status: 200,
        message: 'Successfully created food menu',
        data: food_menu
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.get('/food_menus', async (req, res) => {
  try {
    const food_menus = await controller.getAll();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched food_menus',
      data: food_menus
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.get('/food_menus/:id', async (req, res) => {
  try {
    const food_menu = await controller.getOne(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched food_menu',
      data: food_menu
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.delete('/food_menus/:id', async (req, res) => {
  const session_id = req.session.user.id;

  try {
    const food_menu = await controller.remove(session_id, req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted food_menu',
      data: food_menu
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.put('/food_menus/:id', async (req, res) => {
  const id = req.params.id;
  const description = req.body.description;
  const session_id = req.session.user.id;

    try {
      const food_menu = await controller.edit(session_id, id, description);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited food_menu',
        data: food_menu
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

module.exports = router;