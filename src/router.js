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
const cart_productsRouter = require('./entities/shopping_cart_products/router');
const order_infoRouter = require('./entities/order_information/router');
const inventoryRouter = require('./entities/inventory/router');
const order_rentalRouter = require('./entities/order_rental/router');
const authenticationRouter = require('./entities/authentication/router');
const contactRouter = require('./entities/contact/router');
const FAQsRouter = require('./entities/FAQs/router');
const logRouter = require('./entities/log/router');
const sessionRouter = require('./entities/session/router');

router.use(authenticationRouter);
router.use(administratorRouter);



router.use(contactRouter);
router.use(FAQsRouter);
router.use(productRouter);
router.use(userRouter);
router.use(customerRouter);
router.use(product_colorRouter);
router.use(event_motifRouter);
router.use(packageRouter);
router.use(food_menuRouter);
router.use(request_infoRouter);
router.use(shopping_cartRouter);
router.use(cart_productsRouter);
router.use(order_infoRouter);
router.use(inventoryRouter);
router.use(order_rentalRouter);
router.use(logRouter);
router.use(sessionRouter);

// Middleware for auth
router.use((req, res, next) => {
  //console.log(req.session.user);
  if (req.session.user) {
    return next();
  }

  res.status(401).json({
    status: 401,
    message: 'You are currently not logged in.'
  });
});

module.exports = router;