import { SyntheticEvent } from 'react';
import { Snackbar, Alert } from '@mui/material';

export const AlertError = ({ open, setOpen, msg }) => {
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
        {msg}
      </Alert>
    </Snackbar>
  );
};
