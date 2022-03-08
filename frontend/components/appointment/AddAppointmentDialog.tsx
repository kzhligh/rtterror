import {
  AccordionSummary,
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DateTimePicker } from '@mui/lab';
import { useState } from 'react';
import { Accordion, AccordionDetails } from '@material-ui/core';

const blankAppointment = {
  plan: { serviceName: 'TestService' },
  therapist: { name: 'TestTherapist' },
  branchLocation: '',
  duration: '',
  notes: '',
  feedback: '',
  status: '',
  cancellationTime: '',
  date: '',
};
interface Props extends DialogProps {
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
}

export const AddAppointmentDialog = ({ isOpen, onClose }) => {
  const therapists = [{ name: 'John' }, { name: 'Boyega' }, { name: 'Malcom' }];
  const services = [{ serviceName: 'muiIsSlow' }];
  const existingClients = [
    { name: 'Bean' },
    { name: 'Ben' },
    { name: 'Bobert' },
  ];
  const [expanded, setExpanded] = useState<string | false>(false);
  const [appointmentForm, setAppointment] = useState(blankAppointment);

  return (
    <Dialog fullWidth open={isOpen}>
      <DialogTitle>New Appointment</DialogTitle>

      <DialogContent style={{ width: '100%' }}>
        <form
          style={{ width: '100%' }}
          onSubmit={(e) => {
            e.preventDefault();
            console.log(appointmentForm);
          }}
        >
          <InputLabel>Services</InputLabel>

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

          <InputLabel>Choose a time</InputLabel>
          <DateTimePicker
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
          <Accordion
            expanded={expanded === 'existing'}
            onClick={() => {
              setExpanded(
                expanded === false || expanded === 'newClient'
                  ? 'existing'
                  : false
              );
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Existing Client</Typography>
            </AccordionSummary>
            <AccordionDetails
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Select id="existing" style={{ width: '100%' }}>
                {existingClients.map((client) => (
                  <option key={client.name}>{client.name}</option>
                ))}
              </Select>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'newClient'}
            onClick={() => {
              setExpanded(
                expanded === false || expanded === 'existing'
                  ? 'newClient'
                  : false
              );
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>New Client</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                style={{ width: '100%' }}
                onClick={(E) => {
                  E.stopPropagation();
                }}
              ></TextField>
            </AccordionDetails>
          </Accordion>
          <InputLabel>Notes</InputLabel>
          <TextField
            onChange={(e) => {
              setAppointment((state) => ({
                ...state,
                notes: e.target.value,
              }));
            }}
          ></TextField>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Button
              onClick={(e) => {
                onClose(e, 'backdropClick');
              }}
              variant="outlined"
            >
              close
            </Button>
            <Button variant="outlined">ok</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
