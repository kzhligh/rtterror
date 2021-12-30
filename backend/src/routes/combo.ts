import express from 'express';
import comboService from '../services/combo-service';

const router = express.Router();

router.use(function (req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.get('/', (req, res, next) => {
  comboService
    .getAllItems()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(`ERROR - (${req.method})/combos${req.path}/error: ${error}`);
      res.status(400).send(error);
    });
});

router.get('/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  comboService
    .getItemById(id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(`ERROR - (${req.method})/combos${req.path}/error: ${error}`);
      res.status(400).send(error);
    });
});

router.post('/', (req, res, next) => {
  const { body } = req;
  comboService
    .createItem(body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(`ERROR - (${req.method})/combos${req.path}/error: ${error}`);
      res.status(400).send(error);
    });
});

router.put('/', (req, res, next) => {
  const { body } = req;
  comboService
    .updateItem(body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(`ERROR - (${req.method})/combos${req.path}/error: ${error}`);
      res.status(400).send(error);
    });
});

router.delete('/:id', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  comboService
    .deleteItemById(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(`ERROR - (${req.method})/combos${req.path}/error: ${error}`);
      res.status(400).send(error);
    });
});

router.put('/:id/block', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  comboService
    .updateItemById(id, { blocked: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(`ERROR - (${req.method})/combos${req.path}/error: ${error}`);
      res.status(400).send(error);
    });
});

router.put('/:id/unblock', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  comboService
    .updateItemById(id, { blocked: false })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(`ERROR - (${req.method})/combos${req.path}/error: ${error}`);
      res.status(400).send(error);
    });
});

export default router;
