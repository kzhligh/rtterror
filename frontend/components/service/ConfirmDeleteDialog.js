import * as React from 'react';
import cssStyled from '../../styles/service.module.css';
import {
    Button, Dialog,
    DialogTitle,
    DialogContent,
    Grid, Typography
} from '@mui/material';

export const ConfirmDeleteDialog = (props) => {
    const { open, setOpen, item, deleteService } = props;
    const handleClose = () => {
        setOpen(false);
    };
    const handleConfirm = () => {
        deleteService(item);
        handleClose();
    };
    const isACombo = () => item.hasOwnProperty('services');

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth='sm'
            p={5}
        >
            <DialogTitle id='alert-dialog-title'>
                Delete {isACombo() ? 'Combo' : 'Service'} {item.name}?
            </DialogTitle>
            <DialogContent>
                <Grid
                    container
                    direction='row'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Typography variant='body2'>
                        This action cannot be undone.{' '}
                    </Typography>
                </Grid>
                <Grid
                    container
                    direction='row'
                    justifyContent='flex-end'
                    alignItems='center'
                >
                    <Button
                        className={cssStyled.buttonContainer}
                        variant='contained'
                        onClick={handleConfirm}
                        color='error'
                    >
                        Delete
                    </Button>
                    <Button onClick={handleClose} className={cssStyled.buttonContainer}>
                        Cancel
                    </Button>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};
