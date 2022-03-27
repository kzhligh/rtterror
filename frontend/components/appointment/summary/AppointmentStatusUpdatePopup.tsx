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
}) => {
  const [changedBy, setChangedBy] = useState('');
  const handleClose = () => {
    setName('');

    toggleOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
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
              setChangedBy(event.target.value);
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
            <Button type='submit' variant='contained' color='success'>
              Update
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  );
};
