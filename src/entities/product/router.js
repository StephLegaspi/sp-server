'use strict';
const express = require('express');
const router = express.Router();
const controller = require('./controller');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/products');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname);
  }
})
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

router.get('/products/purchase/table', async (req, res) => {

  try {
    const products = await controller.getAllPurchaseTable();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched products',
      data: products
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.get('/products/rental/table', async (req, res) => {
  try {
    const products = await controller.getAllRentalTable();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched products',
      data: products
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.get('/products/purchase', async (req, res) => {

  try {
    const products = await controller.getAllPurchase();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched products',
      data: products
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});

router.get('/products/rental', async (req, res) => {
  try {
    const products = await controller.getAllRental();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched products',
      data: products
    });
  } catch (status) {
    let message = '';
    res.status(status).json({ status });
  }
});


router.get('/products/:id', async (req, res) => {
  try {
    const product = await controller.getOne(req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched product',
      data: product
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});



router.post('/products/purchase', upload.single('image'), async (req, res) => {

  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const for_purchase = 1;
  const display_product = req.body.display_product;
  const total_quantity = req.body.total_quantity;
  const product_color = req.body.product_color;
  const user_id = req.body.session_id;
  const image = req.file.path;
    
    try {
      const product = await controller.create(user_id, name, description, price, for_purchase, display_product, total_quantity, product_color, image);
      res.status(200).json({
        status: 200,
        message: 'Successfully created product for purchase',
        data: product
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.post('/products/rental', upload.single('image'), async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const for_purchase = 0;
  const display_product = req.body.display_product;
  const total_quantity = req.body.total_quantity;
  const product_color = req.body.product_color;
  const user_id = req.body.session_id;
  const image = req.file.path;
    
    try {
      const product = await controller.create(user_id, name, description, price, for_purchase, display_product, total_quantity, product_color, image);
      res.status(200).json({
        status: 200,
        message: 'Successfully created product for rental',
        data: product
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});

router.get('/products-purchase/search/table/:name', async (req, res) => {
  try {
    const product = await controller.searchNamePurchaseTable(req.params.name);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched product',
      data: product
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.get('/products-rental/search/table/:name', async (req, res) => {
  try {
    const product = await controller.searchNameRentalTable(req.params.name);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched product',
      data: product
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.get('/products-purchase/search/:name', async (req, res) => {
  try {
    const product = await controller.searchNamePurchase(req.params.name);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched product',
      data: product
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});

router.get('/products-rental/search/:name', async (req, res) => {
  try {
    const product = await controller.searchNameRental(req.params.name);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched product',
      data: product
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});


router.put('/products/:id', async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const display_product = req.body.display_product;
  const product_color = req.body.product_color;
  const user_id = req.body.session_id;

    try {
      const product = await controller.edit(user_id, id, name, description, price, display_product, product_color);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited product',
        data: product
      });
    } catch (status) {
      res.status(status).json({ status });
    }
 
});


router.delete('/products/:id', async (req, res) => {
  const user_id = req.body.session_id;

  try {
    const product = await controller.remove(user_id, req.params.id);
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted product',
      data: product
    });
  } catch (status) {
    res.status(status).json({ status });
  }
});


module.exports = router;