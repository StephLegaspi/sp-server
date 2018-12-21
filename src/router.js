const express = require('express');
const router = express.Router();

const productRouter = require('./entities/product/router');
const userRouter = require('./entities/user/router');
const customerRouter = require('./entities/customer/router');
const product_colorRouter = require('./entities/product_color/router');
const administratorRouter = require('./entities/administrator/router');
const event_motifRouter = require('./entities/event_motif/router');
const packageRouter = require('./entities/package/router');
const food_menuRouter = require('./entities/food_menu/router');
const request_infoRouter = require('./entities/request_information/router');
const shopping_cartRouter = require('./entities/shopping_cart/router');

router.use(productRouter);
router.use(userRouter);
router.use(customerRouter);
router.use(product_colorRouter);
router.use(administratorRouter);
router.use(event_motifRouter);
router.use(packageRouter);
router.use(food_menuRouter);
router.use(request_infoRouter);
router.use(shopping_cartRouter);

module.exports = router;