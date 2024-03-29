'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authController = require('../authentication/controller');

//package for image upload
const multer = require('multer');
//declare image destination when upload
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/administrators');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname);
  }
})
//image filter
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

//creates administrator
router.post('/administrators', upload.single('image'), async (req, res) => {
  const session_id = req.body.session_id;
  const first_name = req.body.first_name;
  const middle_name = req.body.middle_name;
  const last_name = req.body.last_name;
  const email_address = req.body.email_address;
  const password = req.body.password;
  const contact_number = req.body.contact_number;
  const user_type = "Administrator";
  const image = req.file.path;

    try {
      await authController.checkValidContact(contact_number);
      await authController.checkValidEmail(email_address);
      await authController.checkEmailExists(email_address);
      const administrator = await controller.create(session_id, first_name, middle_name, last_name, email_address, password, contact_number, user_type, image);
      res.status(200).json({
        status: 200,
        message: 'Successfully created administrator',
        data: administrator
      });
    } catch (status) {
      let message = '';

      switch (status) {
        case 400:
          message = 'Invalid email address or contact number';
          break;
        case 406:
          message = 'Email address already exists';
          break;
        case 500:
          message = 'Internal server error';
          break;
      }
      res.status(status).json({ status, message });
    }
 
});

//gets all administrators
router.get('/administrators', async (req, res) => {
  try {
    const administrators = await controller.getAll();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched administrators',
      data: administrators
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

//gets administrator by name
router.get('/administrators/search/:name', async (req, res) => {
  try {
    const administrator = await controller.getOneByName(req.params.name);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched administrator',
      data: administrator
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//gets administrator information for profile by ID
router.get('/administrators/profile/:id', async (req, res) => {
  const user_id = req.params.id;

  try {
    const administrator = await controller.getProfile(user_id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched administrator',
      data: administrator
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//gets administrator by ID
router.get('/administrators/:id', async (req, res) => {
  try {
    const administrator = await controller.getOne(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched administrator',
      data: administrator
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});


router.delete('/administrators/:id', async (req, res) => {
  const session_id = req.body.session_id;

  try {
    const administrator = await controller.remove(session_id, req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted administrator',
      data: administrator
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

//edits administrator
router.put('/administrators/:id', upload.single('image'), async (req, res) => {
  const id = req.params.id;
  const session_id = req.body.session_id;
  const first_name = req.body.first_name;
  const middle_name = req.body.middle_name;
  const last_name = req.body.last_name;
  const email_address = req.body.email_address;
  const contact_number = req.body.contact_number;
  const image_changed = req.body.image_changed;
  var image = '';

  if(image_changed === 'true'){
    image = req.file.path;
  }

    try {
      const admin = await controller.edit(session_id, id,first_name, middle_name, last_name, email_address, contact_number, image);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited admin',
        data: admin
      });
    } catch (status) {
      let message = '';

      switch (status) {
        case 404:
          message = 'ID not found';
          break;
        case 500:
          message = 'Internal server error';
          break;
      }
      res.status(status).json({ status, message });
    }
 
});

router.put('/administrators/activate/:id', async (req, res) => {
  const id = req.params.id;
  const session_id = req.body.session_id;

    try {
      const admin = await controller.activate(session_id, id);
      res.status(200).json({
        status: 200,
        message: 'Successfully activated admin',
        data: admin
      });
    } catch (status) {
      let message = '';

      switch (status) {
        case 404:
          message = 'ID not found';
          break;
        case 500:
          message = 'Internal server error';
          break;
      }
      res.status(status).json({ status, message });
    }
 
});

router.put('/administrators/deactivate/:id', async (req, res) => {
  const id = req.params.id;
  const session_id = req.body.session_id;

    try {
      const admin = await controller.deactivate(session_id, id);
      res.status(200).json({
        status: 200,
        message: 'Successfully deactivated admin',
        data: admin
      });
    } catch (status) {
      let message = '';

      switch (status) {
        case 404:
          message = 'ID not found';
          break;
        case 500:
          message = 'Internal server error';
          break;
      }
      res.status(status).json({ status, message });
    }
 
});

module.exports = router;