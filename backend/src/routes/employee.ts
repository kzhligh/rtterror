import express from "express";
import employeeService from '../services/employee-service';

const router = express.Router();

router.use(function (req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});

router.post('/', (req, res) => {
    const { body } = req;
    employeeService.createItem(body)
        .then((newEmployee) => {
            res.status(200).send(newEmployee);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
})

export default router;