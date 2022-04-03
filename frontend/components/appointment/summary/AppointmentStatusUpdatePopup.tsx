import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from '@mui/material';

import moment from 'moment';

export const AppointmentStatusUpdatePopup = ({
  open,
  toggleOpen,
  name,
  setName,
  updateStatus,
}) => {
  const [changedBy, setChangedBy] = useState('');
  const handleClose = () => {
    setName('');
    setChangedBy('');

    toggleOpen(false);
  };

  const handleSubmit = (_event) => {
    if (name.trim() === '' || changedBy.trim() === '') {
      return;
    }
    updateStatus(name, changedBy);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm update?</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          value={name}
          onChange={setName}
          label={<Typography>{moment().calendar()}</Typography>}
          type='text'
          variant='standard'
          size='small'
          color='success'
        />
        <TextField
          margin='dense'
          id='by'
          value={changedBy}
          onChange={(event) => {
            setChangedBy(event.target.value.trim());
          }}
          required
          label={'Changed by'}
          placeholder='Sign Here'
          type='text'
          variant='filled'
          size='small'
          color='secondary'
        />
        <DialogActions>
          <Button onClick={handleClose} color='inherit'>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            type='submit'
            variant='contained'
            color='success'
          >
            Update
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
