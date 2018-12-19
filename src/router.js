const express = require('express');
const router = express.Router();
const productRouter = require('./entities/product/router');
const userRouter = require('./entities/user/router');

router.use(productRouter);
router.use(userRouter);


module.exports = router;