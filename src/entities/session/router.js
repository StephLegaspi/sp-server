'use strict';
const express = require('express');
const router = express.Router();

//imports package for setting session
const local_storage = require('localStorage');

router.get('/session/local-storage', async (req, res) => {
  const session_data = JSON.parse(local_storage.getItem("user_data"));
  console.log(session_data);
  try {
    res.status(200).json({
      status: 200,
      session_data: session_data
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.get('/session', async (req, res) => {
  const session_id = 2;

  try {
    res.status(200).json({
      status: 200,
      session_id: session_id
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});


module.exports = router;