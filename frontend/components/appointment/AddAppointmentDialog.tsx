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
import { ICustomer } from './common/appointmentInterfaces';

export const AddAppointmentDialog = ({
  therapists,
  services,
  existingCustomers,
  isOpen,
  onClose,
  createAppointment,
  selectedAppointment,
  setSelectedAppointment,
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [showClientDialog, setShowClientDialog] = useState(false);

  return showClientDialog ? (
    <AddCustomerDialog
      open={showClientDialog}
      onClose={() => setShowClientDialog(false)}
      onCustomerAdded={(newClient: ICustomer) => {
        setSelectedAppointment({
          ...selectedAppointment,
          client_id: newClient.id,
        });
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
            createAppointment({ ...selectedAppointment });
            onClose(e, 'backdropClick');
          }}
        >
          <InputLabel>Services</InputLabel>

          <AppointmentDropdown
            therapists={therapists}
            services={services}
            setAppointment={setSelectedAppointment}
          />

          <InputLabel>Choose a starting time</InputLabel>
          <DateTimePicker
            label={
              new Date(selectedAppointment?.datetime).toLocaleDateString() ??
              'Date'
            }
            value={selectedAppointment.datetime}
            renderInput={(params) => <TextField {...params} />}
            onChange={(date: Date) => {
              setSelectedAppointment((state) => ({
                ...state,
                datetime: new Date(date),
              }));
            }}
          />
          <InputLabel>Set Duration</InputLabel>
          <Select
            id='duration'
            value={selectedAppointment.duration}
            style={{ width: '100%' }}
            onChange={(e) => {
              setSelectedAppointment((state) => ({
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
                getOptionLabel={(option: ICustomer) => option.name}
                style={{ width: '100%' }}
                id='existing'
                onChange={(_event, selected: any) => {
                  const clientId = selected ? selected.id : '';
                  setSelectedAppointment((state) => ({
                    ...state,
                    client_id: clientId,
                    client: selected,
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
              setSelectedAppointment((state) => ({
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
