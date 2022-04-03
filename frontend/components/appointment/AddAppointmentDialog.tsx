import {
  AccordionSummary,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Accordion,
  AccordionDetails,
  Autocomplete,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DateTimePicker } from '@mui/lab';
import { useState } from 'react';
import { AppointmentDropdown } from './AppointmentDropdown';
import { AddCustomerDialog } from '../client/AddCustomerDialog';
import { IAppointmentResponse } from './common/appointmentInterfaces';

interface IClient {
  id: number;
  name: string;
}

const blankAppointment: IAppointmentResponse = {
  id: '',
  client_id: '',
  employee_ids: [],
  service_ids: [],
  datetime: new Date(),
  duration: 30, // in minutes
  repeat: false,
  status: [],
  feedback: '', // optional
  notes: '',
};

export const AddAppointmentDialog = ({
  therapists,
  services,
  existingCustomers,
  isOpen,
  onClose,
  createAppointment,
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [showClientDialog, setShowClientDialog] = useState(false);

  const [appointmentForm, setAppointment] = useState<IAppointmentResponse>(
    blankAppointment
  );

  return showClientDialog ? (
    <AddCustomerDialog
      open={showClientDialog}
      onClose={() => setShowClientDialog(false)}
      onCustomerAdded={(newClient) => {
        setAppointment({ ...appointmentForm, client_id: newClient.id });
        existingCustomers.push({
          ...newClient,
          name: [
            newClient.firstName,
            newClient.lastName,
            newClient.phone,
            newClient.id,
          ].join(' '),
        });
      }}
      maxWidth='md'
      fullWidth
    />
  ) : (
    <Dialog fullWidth open={isOpen}>
      <DialogTitle>New Appointment</DialogTitle>
      <DialogContent style={{ width: '100%' }}>
        <form
          style={{ width: '100%' }}
          onSubmit={(e) => {
            e.preventDefault();
            createAppointment(appointmentForm);
            setAppointment(blankAppointment);
            onClose(e, 'backdropClick');
          }}
        >
          <InputLabel>Services</InputLabel>

          <AppointmentDropdown
            therapists={therapists}
            services={services}
            setAppointment={setAppointment}
          />

          <InputLabel>Choose a starting time</InputLabel>
          <DateTimePicker
            label={appointmentForm.datetime ?? 'Date'}
            value={appointmentForm.datetime}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{ placeholder: 'YYYY-MM-DD-HH:MM' }}
                disabled
              />
            )}
            onChange={(date: Date) => {
              setAppointment((state) => ({
                ...state,
                datetime: date,
              }));
            }}
          />
          <InputLabel>Set Duration</InputLabel>
          <Select
            id='duration'
            value={appointmentForm.duration}
            style={{ width: '100%' }}
            onChange={(e) => {
              setAppointment((state) => ({
                ...state,
                duration: parseInt(e.target.value.toString()),
              }));
            }}
          >
            <MenuItem value={10}>15 minutes</MenuItem>
            <MenuItem value={30}>30 minutes</MenuItem>
            <MenuItem value={45}>45 minutes</MenuItem>
            <MenuItem value={60}>60 minutes</MenuItem>
            <MenuItem value={75}>75 minutes</MenuItem>
            <MenuItem value={90}>90 minutes</MenuItem>
          </Select>
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
              <Autocomplete
                renderInput={(params) => (
                  <TextField {...params} label='Look for Client' />
                )}
                options={existingCustomers}
                getOptionLabel={(option: IClient) => option.name}
                style={{ width: '100%' }}
                id='existing'
                onChange={(_event, value: any) => {
                  const clientId = value ? value.id : -1;
                  setAppointment((state) => ({
                    ...state,
                    client_id: clientId,
                  }));
                }}
              />
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
              <Button
                variant='outlined'
                onClick={() => setShowClientDialog(true)}
              >
                Create New Client
              </Button>
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
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Button
              onClick={(e) => {
                onClose(e, 'backdropClick');
                setAppointment(blankAppointment);
              }}
              variant='outlined'
            >
              Cancel
            </Button>
            <Button variant='outlined' type='submit'>
              Confirm
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
