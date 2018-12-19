const express = require('express');
const router = express.Router();

const productRouter = require('./entities/product/router');
const userRouter = require('./entities/user/router');
const customerRouter = require('./entities/customer/router');
const product_colorRouter = require('./entities/product_color/router');

router.use(productRouter);
router.use(userRouter);
router.use(customerRouter);
router.use(product_colorRouter);


module.exports = router;