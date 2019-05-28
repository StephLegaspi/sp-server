'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const async = require('asyncawait/async');
const await = require('asyncawait/await');

//creates food menu
router.post('/food_menus', async (req, res) => {
  const session_id = req.body.session_id;
  const name = req.body.name;
  const main_course = req.body.main_course;
  const appetizer = req.body.appetizer;
  const dessert = req.body.dessert;
  const soup = req.body.soup;
  const beverage = req.body.beverage;
  const others = req.body.others;
    
    try {
      const food_menu = await controller.create(session_id, name, main_course, appetizer, dessert, soup, beverage, others);
      res.status(200).json({
        status: 200,
        message: 'Successfully created food menu',
        data: food_menu
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

//gets food menu by name
router.get('/food_menus/search/:name', async (req, res) => {
  try {
    const food_menu = await controller.searchName(req.params.name);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched food menu',
      data: food_menu
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//gets the first three food menus
router.get('/food_menus/three', async (req, res) => {
  try {
    const food_menus = await controller.getAllThree();
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

//gets all food menus
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

//gets all food menu names
router.get('/food_menus/names', async (req, res) => {
  try {
    const food_menus = await controller.getAllNames();
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

//gets main course by menu ID
router.get('/food_menus/main_course/:id', async (req, res) => {
  try {
    const food_menu = await controller.getOneMainCourse(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched main_course',
      data: food_menu
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//gets appetizer by menu ID
router.get('/food_menus/appetizer/:id', async (req, res) => {
  try {
    const food_menu = await controller.getOneAppetizer(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched appetizer',
      data: food_menu
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//gets dessert by menu ID
router.get('/food_menus/dessert/:id', async (req, res) => {
  try {
    const food_menu = await controller.getOneDessert(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched dessert',
      data: food_menu
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//gets soup by menu ID
router.get('/food_menus/soup/:id', async (req, res) => {
  try {
    const food_menu = await controller.getOneSoup(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched soup',
      data: food_menu
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//gets beverage by menu ID
router.get('/food_menus/beverage/:id', async (req, res) => {
  try {
    const food_menu = await controller.getOneBeverage(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched beverage',
      data: food_menu
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//gets other courses by menu ID
router.get('/food_menus/others/:id', async (req, res) => {
  try {
    const food_menu = await controller.getOneOthers(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched others',
      data: food_menu
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//gets menu by ID
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

//deletes menu 
router.delete('/food_menus/:id', async (req, res) => {
  const session_id = req.body.session_id;

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

//edits menu
router.put('/food_menus/:id', async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const main_course = req.body.main_course;
  const appetizer = req.body.appetizer;
  const dessert = req.body.dessert;
  const soup = req.body.soup;
  const beverage = req.body.beverage;
  const others = req.body.others;
  const session_id = req.body.session_id;

    try {
      const food_menu = await controller.edit(session_id, name, main_course, appetizer, dessert, soup, beverage, others, id);
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