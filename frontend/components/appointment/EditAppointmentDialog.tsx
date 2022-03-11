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
import { AppointmentHeader } from './AppointmentHeader';
import { AppointmentDropdown } from './AppointmentDropdown';
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
  const services = [{ serviceName: 'acupuncture' }];

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
          <AppointmentHeader appointmentForm={appointmentForm} />

          <InputLabel style={{ marginTop: '5%' }}>Services</InputLabel>

          <AppointmentDropdown
            therapists={therapists}
            services={services}
            setAppointment={setAppointment}
          />

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
