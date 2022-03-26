import React, { useState, useEffect } from 'react';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  InputLabel,
  MenuItem,
  Select,
  Button,
  IconButton,
  DialogProps,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditAppointmentDialog from './EditAppointmentDialog';
import { ConfirmDeleteAlert } from './ConfirmDeleteAlert';
import { AppointmentHeader } from './AppointmentHeader';
const blankForm = {
  client: {
    firstName: 'Jamal',
    lastName: 'Green',
    phoneNumber: '(123)456-7890',
    email: 'jamalG@coldmail.com',
  },
  plan: { serviceName: 'TestService' },
  therapist: { name: 'TestTherapist' },
  branchLocation: 'TestLocation',
  duration: 60,
  notes: 'empty',
  feedback: 'N/A',
  status: 'Pending',
  cancellationTime: '',
  date: new Date(),
};

interface Props extends DialogProps {
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
}
const AppointmentStatusDialog = ({ isOpen, onClose, target }) => {
  const [form, setForm] = useState(blankForm);
  const [editDialog, setEdit] = useState(false);
  const [deleteDialog, setDelete] = useState(false);

  useEffect(() => {
    if (!target) setForm(blankForm);
    else
      setForm({
        client: {
          firstName: target.raw.customer,
          lastName: 'Green',
          phoneNumber: '(123)456-7890',
          email: 'jamalG@coldmail.com',
        },
        plan: { serviceName: 'TestService' },
        therapist: { name: 'TestTherapist' },
        branchLocation: target.location,
        duration: target.raw.duration,
        notes: target.raw.notes,
        feedback: target.raw.feedback,
        status: target.raw.status,
        cancellationTime: '',
        date: target.start,
      });
  }, [target]);

  return (
    <Dialog fullWidth open={isOpen}>
      <DialogTitle>
        <Grid container justifyContent='space-evenly'>
          <Button
            variant='contained'
            color='info'
            size='small'
            onClick={() => {
              setEdit(true);
            }}
          >
            Edit
          </Button>
          <Button variant='contained' size='small' disabled>
            Reschedule
          </Button>
          <Button
            variant='contained'
            color='error'
            size='small'
            onClick={() => {
              setDelete(true);
            }}
          >
            Delete
          </Button>
        </Grid>
        <IconButton
          aria-label='close'
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
        <AppointmentHeader appointmentForm={form} />

        <InputLabel style={{ marginTop: '5%' }}>Status</InputLabel>

        <Select
          id='status'
          value={form.status}
          style={{ width: '100%' }}
          onChange={(e) => {
            setForm((state) => ({
              ...state,
              status: e.target.value,
            }));
          }}
        >
          <MenuItem value='Pending'>Pending</MenuItem>
          <MenuItem value='Checked In'>Checked In</MenuItem>
          <MenuItem value='No Show'>No Show</MenuItem>
        </Select>
        <InputLabel style={{ marginTop: '5%' }}>Notes:</InputLabel>
        <TextField
          margin='normal'
          style={{ width: '100%' }}
          value={form.notes}
          onChange={(e) =>
            setForm((state) => ({
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
