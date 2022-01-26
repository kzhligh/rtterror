import express from 'express';
import serviceService from '../services/service-service';

const router = express.Router();

router.use(function (req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.get('/', (req, res, next) => {
  serviceService
    .getAllValidItems()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(
        `ERROR - (${req.method})/services${req.path}/error: ${error}`
      );
      res.status(400).send(error.message);
    });
});

router.get('/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  console.log(id);
  serviceService
    .getItemById(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(
        `ERROR - (${req.method})/services${req.path}/error: ${error}`
      );
      res.status(400).send(error.message);
    });
});

router.post('/', (req, res, next) => {
  const { body } = req;
  serviceService
    .createItem(body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(
        `ERROR - (${req.method})/services${req.path}/error: ${error}`
      );
      res.status(400).send(error.message);
    });
});

router.put('/', (req, res, next) => {
  const { body } = req;
  serviceService
    .updateItem(body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(
        `ERROR - (${req.method})/services${req.path}/error: ${error}`
      );
      res.status(400).send(error.message);
    });
});

router.delete('/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  serviceService
    .updateItemById(id, { hidden: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(
        `ERROR - (${req.method})/services${req.path}/error: ${error}`
      );
      res.status(400).send(error.message);
    });
});

router.put('/block/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  serviceService
    .updateItemById(id, { blocked: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(
        `ERROR - (${req.method})/services${req.path}/error: ${error}`
      );
      res.status(400).send(error.message);
    });
});

router.put('/unblock/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  serviceService
    .updateItemById(id, { blocked: false })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(
        `ERROR - (${req.method})/services${req.path}/error: ${error}`
      );
      res.status(400).send(error.message);
    });
});

export default router;
