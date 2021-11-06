const express = require('express');

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
} = require('../services/product');

const router = express.Router();

router.use(function (req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.get('/', (req, res, next) => {
  getAllProducts()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

router.get('/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  console.log(id);
  getProductById(id)
    .then((data) => {
      console.log('the return value of findByPk() is: ', data);
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

router.post('/', (req, res, next) => {
  const { body } = req;
  createProduct(body)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

router.put('/:id', (req, res, next) => {
  const { params, body } = req;
  const { id } = params;
  const productObj = {
    ...body,
    id: id,
  };
  updateProduct(productObj)
    .then(([numberOfUpdate]) => {
      console.log(`${numberOfUpdate} product(s) information has been updated`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  deleteProductById(id)
    .then((data) => {
      console.log(`${data} product(s) has been deleted`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
