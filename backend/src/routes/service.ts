import express from 'express';
import serviceService from '../services/service-service';
import { sendBackErrorMessage } from 'src/routes/errorProcess';

const router = express.Router();

router.use(function (_req, _res, next) {
  next();
});

router.get('/', (req, res, _next) => {
  serviceService
    .getAllValidItems()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      sendBackErrorMessage(req, res, error);
    });
});

router.get('/:serviceCode', (req, res, _next) => {
  const { params } = req;
  const { serviceCode } = params;
  serviceService
    .getItemsByServiceCode(serviceCode)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      sendBackErrorMessage(req, res, error);
    });
});

router.post('/', (req, res, _next) => {
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

router.put('/', (req, res, _next) => {
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

router.delete('/:serviceCode', (req, res, _next) => {
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
  serviceService
    .blockUnblockServices(serviceCode, true)
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
  serviceService
    .blockUnblockServices(serviceCode, false)
    .then((updatedServices) => {
      res.status(200).send(updatedServices);
    })
    .catch((error) => {
      sendBackErrorMessage(req, res, error);
    });
});

export default router;
