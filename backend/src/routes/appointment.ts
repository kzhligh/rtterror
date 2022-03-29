import express from "express";
import appointmentService from '../services/appointment-service';
import { sendBackErrorMessage } from "src/routes/errorProcess";

const router = express.Router();

router.post('/', (req, res) => {
  appointmentService.createItem(req.body)
    .then(newAppointment => res.status(200).send(newAppointment))
    .catch(error => sendBackErrorMessage(req, res, error));
});

router.get('/', (req, res) => {
  appointmentService.getAllValidItems()
    .then(allAppointments => res.status(200).send(allAppointments))
    .catch(error => sendBackErrorMessage(req, res, error));
});

router.get('/filter', (req, res) => {
  appointmentService.getItemsByFilter(req.query)
    .then(filteredAppointments => res.status(200).send(filteredAppointments))
    .catch(error => sendBackErrorMessage(req, res, error));
});

router.get('/period', (req, res) => {
  appointmentService.getItemsWithin(req.query.startDate, req.query.endDate)
    .then(periodicAppointments => res.status(200).send(periodicAppointments))
    .catch(error => sendBackErrorMessage(req, res, error));
})

router.get('/:id', (req, res) => {
  appointmentService.getItemById(req.params.id)
    .then(appointmentItem => res.status(200).send(appointmentItem))
    .catch(error => sendBackErrorMessage(req, res, error));
});

router.put('/', (req, res) => {
  appointmentService.updateItem(req.body)
    .then(updatedAppointment => res.status(200).send(updatedAppointment))
    .catch(error => sendBackErrorMessage(req, res, error));
});

router.delete('/:id', (req, res) => {
  appointmentService.hideItemById(req.params.id)
    .then(updatedAppointments => res.status(200).send(updatedAppointments))
    .catch(error => sendBackErrorMessage(req, res, error));
});

export default router;