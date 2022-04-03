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
import { AppointmentStatusUpdatePopup } from './summary';
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
  const [openStatusUpdate, setOpenStatusUpdate] = useState(false);

  const handleSubmit = (e) => {
    createAppointment({ ...editForm, status: e.status });
    onClose(e);
  };

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
        <form onSubmit={handleSubmit}>
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
                label='Duration (min)'
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
                  <TextField {...params} required label='Existing Client' />
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
              <TextField
                label='Created by'
                required
                value={
                  editForm.status.length ? editForm.status[0].by : 'not signed'
                }
                disabled={true}
              />
              <AppointmentStatusUpdatePopup
                open={openStatusUpdate}
                toggleOpen={setOpenStatusUpdate}
                name={'Created'}
                setName={() => {}}
                updateStatus={(name: string, changedBy: string) => {
                  const newStatus: IStatus = {
                    name: name,
                    by: changedBy,
                    at: new Date(),
                  };

                  setEditForm((prevContent) => ({
                    ...prevContent,
                    status: [newStatus],
                  }));

                  if (editForm.client_id === -1) {
                    return;
                  }

                  handleSubmit({
                    status: [newStatus],
                  });
                }}
              />
            </Box>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpenStatusUpdate(true)}
          variant='contained'
          color='primary'
          size='large'
        >
          Confirm
        </Button>
        <Button onClick={onClose} color='inherit' size='large'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
