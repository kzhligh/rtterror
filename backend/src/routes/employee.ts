import express from "express";
import employeeService from '../services/employee-service';
import { sendBackErrorMessage } from "src/routes/errorProcess";

const router = express.Router();

router.post('/', (req, res) => {
    const { body } = req;
    employeeService.createItem(body)
        .then((newEmployee) => {
            res.status(200).send(newEmployee);
        })
        .catch((error) => {
            sendBackErrorMessage(req, res, error);
        });
});

router.get('/', (req, res) => {
    employeeService.getAllItems()
        .then((allEmployees) => {
            res.status(200).send(allEmployees);
        })
        .catch((error) => {
            sendBackErrorMessage(req, res, error);
        });
});

router.get('/:id', (req, res) => {
    employeeService.getItemById(req.params.id)
        .then((employee) => {
            res.status(200).send(employee);
        })
        .catch((error) => {
            sendBackErrorMessage(req, res, error);
        });
});

router.put('/', (req, res) => {
    employeeService.updateItem(req.body)
        .then((updatedService) => {
            res.status(200).send(updatedService);
        })
        .catch((error) => {
            sendBackErrorMessage(req, res, error);
        });
});

router.delete('/multiple', (req, res) => {
    employeeService.hideItemsByIds(req.body.ids)
        .then((updatedEmployees) => {
            res.status(200).send(updatedEmployees);
        })
        .catch((error) => {
            sendBackErrorMessage(req, res, error);
        });
});

router.delete('/:id', (req, res) => {
    employeeService.hideItemById(req.params.id, { hidden: true })
        .then((updatedEmployees) => {
            res.status(200).send(updatedEmployees);
        })
        .catch((error) => {
            sendBackErrorMessage(req, res, error);
        });
});

export default router;