const express = require('express');

const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteServiceById,
  blockServiceById,
  unblockServiceById,
} = require('../services/service');

const router = express.Router();

router.use(function (req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.get('/', (req, res, next) => {
  getAllServices()
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
  getServiceById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

router.post('/', (req, res, next) => {
  const { body } = req;
  createService(body)
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
  const serviceObj = {
    ...body,
    id: id,
  };
  updateService(serviceObj)
    .then(([numberOfUpdate]) => {
      console.log(`${numberOfUpdate} service(s) information has been updated`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  deleteServiceById(id)
    .then((data) => {
      console.log(`${data} customer(s) has been deleted`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.put('/block/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  blockServiceById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

router.put('/unblock/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  unblockServiceById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
