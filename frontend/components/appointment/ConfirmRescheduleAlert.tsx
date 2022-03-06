import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogProps,
  Button,
} from '@mui/material';
import React from 'react';

interface ConfirmRescheduleAlertProps extends DialogProps {
  open: boolean;
  handleClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
}

export const ConfirmRescheduleAlert = ({
  open,
  handleClose = () => {},
  onConfirm = (event: React.MouseEvent<any, MouseEvent>) => {
    event;
  },
  ...props
}: ConfirmRescheduleAlertProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...props}
    >
      <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          r u sure u wanna do this?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose as React.MouseEventHandler<HTMLButtonElement>}
        >
          No
        </Button>
        <Button onClick={onConfirm} autoFocus>
          Yea
        </Button>
      </DialogActions>
    </Dialog>
  );
};
