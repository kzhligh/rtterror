import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  Button,
  TextField,
} from '@mui/material';
import { AppointmentHeader, AppointmentStatus, IStatus } from './summary';
import { AppointmentDropdown } from './AppointmentDropdown';
import CustomDay from './DatePicker';

const EditAppointmentDialog = ({
  isOpen,
  onClose,
  appointmentObj,
  setAppointmentObj,
}) => {
  const [editForm, setEditForm] = useState(appointmentObj);

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center', paddingBottom: 0 }}>
        Edit Appointment
      </DialogTitle>
      <form
        style={{ width: '100%' }}
        onSubmit={(e) => {
          e.preventDefault();
          setAppointmentObj((state) => ({ ...state, ...editForm }));
          onClose(e, editForm);
        }}
      >
        <DialogContent style={{ width: '100%' }}>
          <AppointmentHeader appointmentForm={editForm} />
          <Box
            display='grid'
            gridTemplateColumns='repeat(3, 1fr)'
            gridTemplateRows='repeat(1, 75vh)'
            gap={3}
          >
            <CustomDay editForm={editForm} setEditForm={setEditForm} />
            <Box>
              <InputLabel style={{ marginTop: '5%' }}>Services</InputLabel>

              <AppointmentDropdown
                therapists={editForm.employees}
                services={editForm.services}
                setAppointment={setEditForm}
              />
            </Box>
            <Box>
              <AppointmentStatus
                statuses={editForm.status}
                updateStatus={(name, changedBy) => {
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
                expanded={true}
              />
              <TextField
                label='Memo'
                multiline
                fullWidth
                margin='normal'
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
        </DialogContent>
        <DialogActions>
          <Button type='submit' variant='contained' color='info' size='large'>
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
      </form>
    </Dialog>
  );
};

export default EditAppointmentDialog;
