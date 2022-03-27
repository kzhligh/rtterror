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

const blankForm = {
  datetime: Date(),
  duration: 60,
  status: [],
  notes: 'insert memo here',
  employees: [],
  services: [],
};

const AppointmentStatusDialog = ({ isOpen, onClose, target, updateMemo }) => {
  const [formContent, setFormContent] = useState(
    target ? { ...target } : blankForm
  );
  const [editDialog, setEdit] = useState(false);
  const [deleteDialog, setDelete] = useState(false);

  useEffect(() => {
    if (!target) setFormContent(blankForm);
    else setFormContent({ ...target });
  }, [target]);

  const onCloseDialog = (e, reason) => {
    updateMemo(formContent.notes);
    onClose(e, reason);
  };
  console.log(formContent.status);
  return (
    <Dialog
      fullWidth
      open={isOpen}
      transitionDuration={{ exit: 0 }}
      onClose={onCloseDialog}
    >
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
            onCloseDialog(e, 'backdropClick');
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
          <AppointmentHeader appointmentForm={formContent} />
          <Grid container direction='row'>
            <Grid item xs={6}>
              <AppointmentTime
                date={formContent.datetime}
                duration={formContent.duration}
              />
              <AppointmentStatus
                statuses={formContent.status}
                setForm={setFormContent}
              />

              <TextField
                label='Memo'
                multiline
                fullWidth
                margin='normal'
                value={formContent.notes}
                onChange={(e) =>
                  setFormContent((state) => ({
                    ...state,
                    notes: e.target.value,
                  }))
                }
                variant='filled'
                color='warning'
              />
            </Grid>
            <Grid item xs={6}>
              <AppointmentServiceList
                services={formContent.services}
                therapists={formContent.employees}
                therapistNames={formContent.employees?.map((emp) =>
                  [emp.first_name, emp.last_name].join(' ')
                )}
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
          onCloseDialog(e, 'backdropClick');
          setDelete(false);
        }}
        onConfirm={(e) => {
          onCloseDialog(e, 'backdropClick');
          setDelete(false);
        }}
      />
    </Dialog>
  );
};

export default AppointmentStatusDialog;
