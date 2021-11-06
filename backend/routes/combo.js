const express = require('express');

const {
  getAllValidCombos,
  getComboById,
  createCombo,
  updateCombo,
  deleteComboById,
  blockComboById,
  unblockComboById,
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
  const { comboObj, serviceIds } = body;
  createCombo(comboObj, serviceIds)
    .then((data) => {
      // console.log(data);
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

router.put('/', (req, res, next) => {
  const { body } = req;
  const { comboObj, serviceIds } = body;
  updateCombo(comboObj, serviceIds)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

router.delete('/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  deleteComboById(id)
    .then((data) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
    });
});

router.put('/block/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  console.log('PUT block combo route: ', id);
});

router.put('/unblock/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  console.log('PUT unblock combo route: ', id);
});

module.exports = router;
