const express = require('express');
const Service = require('../models/service');

const router = express.Router();
const serviceModel = Service();

router.use(function (req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.get('/', (req, res, next) => {
  serviceModel
    .findAll({ raw: true })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
});

router.get('/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  console.log(id);
  serviceModel
    .findByPk(id)
    .then((data) => {
      console.log('the return value of findByPk() is: ', data.dataValues);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/', (req, res, next) => {
  const { body } = req;
  serviceModel
    .create(body)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/:id', (req, res, next) => {
  const { params, body } = req;
  const { id } = params;
  serviceModel
    .update(body, {
      where: {
        id: id,
      },
    })
    .then(([numberOfUpdate]) => {
      console.log(`${numberOfUpdate} service(s) information has been updated`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  serviceModel
    .destroy({
      where: {
        id: id,
      },
    })
    .then((data) => {
      console.log(`${data} customer(s) has been deleted`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
