import React, { useState, useEffect } from 'react';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  InputLabel,
  Button,
  IconButton,
  DialogProps,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditAppointmentDialog from './EditAppointmentDialog';
import { ConfirmDeleteAlert } from './ConfirmDeleteAlert';

import {
  AppointmentHeader,
  AppointmentServiceList,
  AppointmentStatus,
  AppointmentTime,
} from './summary';

interface Props extends DialogProps {
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
}

export interface IAppointmentForm {
  client: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
  services: Object[];
  therapistNames: string[];
  therapists: Object[];
  branchLocation: string;
  duration: string | number;
  notes: string;
  feedback: string;
  status: Object;
  date: Date;
}

const blankForm: IAppointmentForm = {
  client: {
    firstName: 'Jamal',
    lastName: 'Green',
    phoneNumber: '(123)456-7890',
    email: 'jamalG@coldmail.com',
  },
  services: [{ name: 'TestService' }],
  therapistNames: ['Therapist Name'],
  therapists: [{ name: 'TestTherapist' }],
  branchLocation: 'TestLocation',
  duration: 60,
  notes: 'empty',
  feedback: 'N/A',
  status: 'Pending',
  date: new Date(),
};

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
        services: target.raw.services,
        therapistNames: target.attendees,
        therapists: target.raw.therapists,
        branchLocation: target.location,
        duration: target.raw.duration,
        notes: target.raw.notes,
        feedback: target.raw.feedback,
        status: target.raw.status,
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
        <Grid container>
          <AppointmentHeader appointmentForm={form} />
          <Grid container direction='row'>
            <Grid container direction='column' xs={6}>
              <AppointmentTime date={form.date} duration={form.duration} />
              <AppointmentStatus status={form.status} setForm={setForm} />

              <InputLabel style={{ marginTop: '5%' }}>Notes:</InputLabel>
              <TextField
                multiline
                margin='normal'
                value={form.notes}
                onChange={(e) =>
                  setForm((state) => ({
                    ...state,
                    notes: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={6}>
              <AppointmentServiceList
                services={form.services}
                therapists={form.therapists}
                therapistNames={form.therapistNames}
              />
            </Grid>
          </Grid>
        </Grid>
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
