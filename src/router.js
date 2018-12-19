const express = require('express');
const router = express.Router();
const productRouter = require('./entities/product/router');
const userRouter = require('./entities/user/router');
const customerRouter = require('./entities/customer/router');

router.use(productRouter);
router.use(userRouter);
router.use(customerRouter);


module.exports = router;