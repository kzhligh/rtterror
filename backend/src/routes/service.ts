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

router.get('/:serviceCode', (req, res, next) => {
  const { params } = req;
  const { serviceCode } = params;
  console.log(serviceCode);
  serviceService
    .getItemsByServiceCode(serviceCode)
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
    .createItems(body)
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
    .updateItems(body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      sendBackErrorMessage(req, res, error);
    });
});

router.delete('/:serviceCode', (req, res, next) => {
  const { params } = req;
  const { serviceCode } = params;
  serviceService
    .hideItemsByServiceCode(serviceCode)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      sendBackErrorMessage(req, res, error);
    });
});

router.put('/:serviceCode/block', (req, res) => {
  const { params } = req;
  const { serviceCode } = params;
  serviceService.blockUnblockServices(serviceCode, true)
      .then((updatedServices) => {
        res.status(200).send(updatedServices);
      })
      .catch((error) => {
        sendBackErrorMessage(req, res, error);
      });
});

router.put('/:serviceCode/unblock', (req, res) => {
  const { params } = req;
  const { serviceCode } = params;
  serviceService.blockUnblockServices(serviceCode, false)
      .then((updatedServices) => {
        res.status(200).send(updatedServices);
      })
      .catch((error) => {
        sendBackErrorMessage(req, res, error);
      });
});

export default router;
