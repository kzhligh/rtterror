import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputLabel,
  TextField,
  Autocomplete,
  DialogActions,
  Box,
} from '@mui/material';
import { DateTimePicker } from '@mui/lab';
import { useState } from 'react';
import { AppointmentStatus } from './summary';
import { AppointmentDropdown } from './AppointmentDropdown';
import { AddCustomerDialog } from '../client/AddCustomerDialog';
import { ICustomer, IStatus } from './common/appointmentInterfaces';

export const AddAppointmentDialog = ({
  therapists,
  services,
  existingCustomers,
  isOpen,
  onClose,
  createAppointment,
  selectedAppointment: editForm,
  setSelectedAppointment: setEditForm,
}) => {
  const [showClientDialog, setShowClientDialog] = useState(false);

  return showClientDialog ? (
    <AddCustomerDialog
      open={showClientDialog}
      onClose={() => setShowClientDialog(false)}
      onCustomerAdded={(newClient: ICustomer) => {
        setEditForm({
          ...editForm,
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
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createAppointment({ ...editForm });
            onClose(e, 'backdropClick');
          }}
        >
          <Box display='grid' gap={3}>
            <Box display='grid' gridAutoColumns='1fr' marginTop={2}>
              <DateTimePicker
                label='Start Time'
                value={editForm.datetime}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size='small'
                    sx={{ gridColumn: 'span 3' }}
                  />
                )}
                onChange={(date: Date) => {
                  setEditForm((state) => ({
                    ...state,
                    datetime: new Date(date),
                  }));
                }}
              />
              <TextField
                id='duration'
                label='Duration'
                value={editForm.duration}
                onChange={(e) => {
                  setEditForm((state) => ({
                    ...state,
                    duration: parseInt(e.target.value),
                  }));
                }}
                size='small'
                sx={{ gridColumn: '5' }}
              />
            </Box>
            <Box display='grid' gridAutoColumns='1fr'>
              <Autocomplete
                id='existing'
                openOnFocus
                options={existingCustomers}
                getOptionLabel={(option: ICustomer) => option.name}
                onChange={(_event, selected: any) => {
                  const clientId = selected ? selected.id : -1;
                  setEditForm((state) => ({
                    ...state,
                    client_id: clientId,
                    client: selected,
                  }));
                }}
                sx={{ gridColumn: 'span 3' }}
                renderInput={(params) => (
                  <TextField {...params} label='Existing Client' />
                )}
              />
              <Button
                variant='outlined'
                onClick={() => setShowClientDialog(true)}
                sx={{
                  gridColumn: '5',
                }}
                size='small'
              >
                New Client
              </Button>
            </Box>

            <Box display='grid' gridAutoColumns='1fr'>
              <InputLabel>Services</InputLabel>

              <AppointmentDropdown
                therapists={therapists}
                services={services}
                setAppointment={setEditForm}
              />
            </Box>
            <Box display='grid' gridTemplateColumns='repeat(2, auto)' gap={1}>
              <AppointmentStatus
                statuses={editForm.status}
                updateStatus={(name: string, changedBy: string) => {
                  const newStatus: IStatus = {
                    name: name,
                    by: changedBy,
                    at: new Date(),
                  };

                  setEditForm((prevContent) => ({
                    ...prevContent,
                    status: [newStatus, ...prevContent.status],
                  }));
                }}
                expanded={false}
              />
              <Box>
                <TextField
                  label='Memo'
                  multiline
                  fullWidth
                  maxRows={3}
                  value={editForm.notes}
                  onChange={(e) =>
                    setEditForm((state) => ({
                      ...state,
                      notes: e.target.value,
                    }))
                  }
                  variant='filled'
                  color='warning'
                />
              </Box>
            </Box>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button type='submit' variant='contained' color='primary' size='large'>
          Confirm
        </Button>
        <Button
          onClick={(e) => {
            onClose(e);
          }}
          color='inherit'
          size='large'
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
