'use strict';
const express = require('express');
const router = express.Router();
/*const controller = require('./controller');*/

/*const async = require('asyncawait/async');
const await = require('asyncawait/await');*/

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

router.get('/session/user', async (req, res) => {
  const session_id = req.session.user;
  console.log(session_id);
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