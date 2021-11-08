const express = require('express');

const {
  getAllValidEmployee,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployeeById,
} = require('../services/services_employees');

const router = express.Router();

router.use(function (req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

router.get('/', (req, res, next) => {
  getAllValidEmployee()
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
  getEmployeeById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

router.post('/', (req, res, next) => {
  const { body } = req;
  const { serviceEmployeeObj, serviceIds } = body;
  addEmployee(serviceEmployeeObj, serviceIds)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

router.put('/', (req, res, next) => {
  const { body } = req;
  const { serviceEmployeeObj, serviceIds } = body;
  updateEmployee(serviceEmployeeObj, serviceIds)
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
  deleteEmployeeById(id)
    .then((data) => {
      console.log(`${data} Employee has been removed`);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
