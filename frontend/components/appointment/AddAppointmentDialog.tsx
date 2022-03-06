import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Dialog,
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
  const [appointmentForm, setAppointment] = useState(blankAppointment);
  const addAppointment = () => {
    console.log(appointmentForm);
  };
  return (
    <>
      <Dialog open={isOpen}>
        <DialogTitle>New Appointment</DialogTitle>
        <FormControl onSubmit={addAppointment}>
          <FormGroup className={styles.userFormGroup}>
            <Box className={styles.userFormRow}>
              <InputLabel>Service</InputLabel>
            </Box>
            <TextField
              className={styles.userTextField}
              margin="normal"
              required
              value={appointmentForm.plan}
              onChange={(e) =>
                setAppointment((state) => ({
                  ...state,
                  service: e.target.value,
                }))
              }
            />
          </FormGroup>
          <FormGroup>
            <InputLabel>Therapist(s)</InputLabel>
            <Select
              placeholder="Choose a therapist"
              label="therapist"
              value={appointmentForm.therapist}
              onChange={(e) =>
                setAppointment((state) => ({
                  ...state,
                  therapist: e.target.value,
                }))
              }
            >
              {therapists.map((therapist) => {
                <MenuItem value={therapist.name}>{therapist.name}</MenuItem>;
              })}
            </Select>
          </FormGroup>
          <FormGroup>
            <InputLabel>Date</InputLabel>
            <DatePicker
              label={appointmentForm.date ?? 'Date'}
              value={appointmentForm.date}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputProps={{ placeholder: 'YYYY-MM-DD' }}
                  disabled
                />
              )}
              onChange={(date: Date) =>
                setAppointment((state) => ({
                  ...state,
                  date: Intl.DateTimeFormat('sv-SE').format(date),
                }))
              }
            />
          </FormGroup>
        </FormControl>
      </Dialog>
    </>
  );
};
