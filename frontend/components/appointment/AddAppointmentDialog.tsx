import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Dialog,
  DialogContent,
  DialogTitle,
  FormGroup,
} from '@mui/material';
import { DatePicker } from '@mui/lab';
import { useState } from 'react';
import styles from 'styles/client.module.css';

const blankAppointment = {
  plan: '',
  therapist: '',
  branchLocation: '',
  duration: '',
  notes: '',
  feedback: '',
  status: '',
  cancellationTime: '',
  date: '',
};

export const AddAppointmentDialog = ({ isOpen }) => {
  const therapists = [{ name: 'John' }, { name: 'Boyega' }, { name: 'Malcom' }];
  const services = [{ serviceName: 'muiIsSlow' }];
  const [appointmentForm, setAppointment] = useState(blankAppointment);

  return (
    <Dialog open={isOpen}>
      <DialogTitle>New Appointment</DialogTitle>

      <DialogContent>
        <form>
          <label htmlFor="therapists">Therapists</label>
          <br></br>
          <select id="therapists">
            {therapists.map((therapist) => (
              <option key={therapist.name}>{therapist.name}</option>
            ))}
          </select>

          <br></br>
          <br></br>

          <label htmlFor="services">Services</label>
          <br></br>
          <select id="services">
            {services.map((therapist) => (
              <option key={therapist.serviceName}>
                {therapist.serviceName}
              </option>
            ))}
          </select>

          <br></br>
          <br></br>

          <label htmlFor="date">Date</label>
          <br></br>
          <input id="date" type="date" />

          <br></br>
          <br></br>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <button>close</button>
            <button>ok</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
