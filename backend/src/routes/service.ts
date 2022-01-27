import express from 'express';
import serviceService from '../services/service-service';

const router = express.Router();

const sendBackErrorMessage = (
  req: express.Request,
  res: express.Response,
  error: Error
) => {
  console.error(`ERROR - (${req.method})/services${req.path}/error: ${error}`);
  res.status(400).send(error.message);
};

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
      sendBackErrorMessage(req, res, error);
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
      sendBackErrorMessage(req, res, error);
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
      sendBackErrorMessage(req, res, error);
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
      sendBackErrorMessage(req, res, error);
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
      sendBackErrorMessage(req, res, error);
    });
});

router.put('/:id/block', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  serviceService
    .updateItemById(id, { blocked: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      sendBackErrorMessage(req, res, error);
    });
});

router.put('/:id/unblock', (req, res, next) => {
  const { params } = req;
  const { id } = params;
  serviceService
    .updateItemById(id, { blocked: false })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      sendBackErrorMessage(req, res, error);
    });
});

export default router;
