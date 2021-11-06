const express = require('express');

const {
  getAllValidCombos,
  getComboById,
  createCombo,
} = require('../services/combo');

const router = express.Router();

router.use(function (req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.get('/', (req, res, next) => {
  getAllValidCombos()
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
  getComboById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

router.post('/', (req, res, next) => {
  const { body } = req;
  const { comboObj, serviceIdQts } = body;
  createCombo(comboObj, serviceIdQts)
    .then((data) => {
      // console.log(data);
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
