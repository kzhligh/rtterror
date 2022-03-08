import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
  DialogProps,
} from '@mui/material';
import moment from 'moment';
const blankAppointment = {
  client: {
    firstName: 'Jamal',
    lastName: 'Green',
    phoneNumber: '(123)456-7890',
    email: 'jamalG@coldmail.com',
  },
  plan: { serviceName: 'TestService' },
  therapist: { name: 'TestTherapist' },
  branchLocation: 'TestLocation',
  duration: 90,
  notes: 'N/A',
  feedback: 'N/',
  status: 'Pending',
  cancellationTime: '',
  date: '2022-03-07',
};
interface Props extends DialogProps {
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
}
const EditAppointmentDialog = ({ isOpen, onClose }) => {
  const [appointmentForm, setAppointment] = useState(blankAppointment);
  const therapists = [{ name: 'John' }, { name: 'Boyega' }, { name: 'Malcom' }];
  const services = [{ serviceName: 'muiIsSlow' }];

  return (
    <Dialog fullWidth open={isOpen}>
      <DialogTitle style={{ textAlign: 'center' }}>
        Edit Appointment
      </DialogTitle>

      <DialogContent style={{ width: '100%' }}>
        <form
          style={{ width: '100%' }}
          onSubmit={(e) => {
            e.preventDefault();
            setAppointment((state) => ({ ...state, status: 'Pending' }));
            console.log(appointmentForm);
            onClose(e, 'backdropClick');
          }}
        >
          <div style={{ display: 'inline-flex', width: '100%' }}>
            <div style={{ width: '50%' }}>
              <Typography>
                {`${appointmentForm.client.firstName} ${appointmentForm.client.lastName}`}
              </Typography>
              <Typography style={{ marginTop: '10%' }}>
                {moment(appointmentForm.date).format('dddd, MMMM Do YYYY')}
              </Typography>
              <Typography>
                {moment(appointmentForm.date).format(' h:mm a')}
                {' - '}
                {moment(appointmentForm.date)
                  .add(appointmentForm.duration, 'minutes')
                  .format(' h:mm a')}
              </Typography>
              <Typography>{appointmentForm.duration} minutes</Typography>
              <Typography>{appointmentForm.plan.serviceName}</Typography>
            </div>
            <div>
              <Typography>
                Primary Phone: {appointmentForm.client.phoneNumber}{' '}
              </Typography>
              <Typography>Email: {appointmentForm.client.email}</Typography>
            </div>
          </div>

          <InputLabel style={{ marginTop: '5%' }}>Services</InputLabel>

          <Select
            id="services"
            defaultValue="Choose a therapist"
            style={{ width: '100%' }}
            value={appointmentForm.plan.serviceName}
            onChange={(e) => {
              setAppointment((state) => ({
                ...state,
                plan: { serviceName: e.target.value as string },
              }));
            }}
          >
            {services.map((service) => (
              <MenuItem key={service.serviceName} value={service.serviceName}>
                {service.serviceName}
              </MenuItem>
            ))}
          </Select>

          <InputLabel>Therapists</InputLabel>

          <Select
            id="therapists"
            defaultValue="Choose a therapist"
            value={appointmentForm.therapist.name}
            style={{ width: '100%' }}
            onChange={(e) => {
              setAppointment((state) => ({
                ...state,
                therapist: { name: e.target.value as string },
              }));
            }}
          >
            {therapists.map((therapist) => (
              <MenuItem key={therapist.name} value={therapist.name}>
                {therapist.name}
              </MenuItem>
            ))}
          </Select>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}
          ></div>
          <div>
            <Button
              onClick={(e) => {
                onClose(e, 'backdropClick');
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button variant="outlined" type="submit">
              Confirm
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAppointmentDialog;
