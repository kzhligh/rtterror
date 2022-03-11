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
  IconButton,
  DialogProps,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import EditAppointmentDialog from './EditAppointmentDialog';
import { ConfirmDeleteAlert } from './ConfirmDeleteAlert';
import { AppointmentHeader } from './AppointmentHeader';
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
const AppointmentStatusDialog = ({ isOpen, onClose }) => {
  const [appointmentForm, setAppointment] = useState(blankAppointment);
  const [editDialog, setEdit] = useState(false);
  const [deleteDialog, setDelete] = useState(false);

  return (
    <Dialog fullWidth open={isOpen}>
      <DialogTitle>
        <div style={{ textAlign: 'center' }}>
          <Button
            onClick={() => {
              setEdit(true);
            }}
            variant="outlined"
          >
            Edit
          </Button>
          <Button variant="outlined">Reschedule</Button>
          <Button
            variant="outlined"
            onClick={() => {
              setDelete(true);
            }}
          >
            Delete
          </Button>
        </div>
        <IconButton
          aria-label="close"
          onClick={(e) => {
            onClose(e, 'backdropClick');
          }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent style={{ width: '100%' }}>
        <AppointmentHeader appointmentForm={appointmentForm} />

        <InputLabel style={{ marginTop: '5%' }}>Status</InputLabel>

        <Select
          id="status"
          value={appointmentForm.status}
          style={{ width: '100%' }}
          onChange={(e) => {
            setAppointment((state) => ({
              ...state,
              status: e.target.value,
            }));
          }}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Checked In">Checked In</MenuItem>
          <MenuItem value="No Show">No Show</MenuItem>
        </Select>
        <InputLabel style={{ marginTop: '5%' }}>Notes:</InputLabel>
        <TextField
          margin="normal"
          style={{ width: '100%' }}
          value={appointmentForm.notes}
          onChange={(e) =>
            setAppointment((state) => ({
              ...state,
              notes: e.target.value,
            }))
          }
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        ></div>
      </DialogContent>
      <EditAppointmentDialog
        isOpen={editDialog}
        onClose={() => {
          setEdit(false);
        }}
      />
      <ConfirmDeleteAlert
        open={deleteDialog}
        handleClose={(e) => {
          onClose(e, 'backdropClick');
          setDelete(false);
        }}
        onConfirm={(e) => {
          onClose(e, 'backdropClick');
          setDelete(false);
        }}
      />
    </Dialog>
  );
};

export default AppointmentStatusDialog;
