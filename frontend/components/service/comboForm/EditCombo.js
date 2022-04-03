import * as React from 'react';
import { useState } from 'react';
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton, Stack
} from '@mui/material';
import { Close } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import _isEmpty from 'lodash/isEmpty';
import { ComboItem } from './ComboItem';

export const EditCombo = ({
    editDialog, setEditDialog, removeService, handleSave, extractAddServiceEdit, serviceListAddable,
}) => {
    const [serviceToAdd, setServiceToAdd] = useState([]);

    const handleAddRemoveService = (val, item) => {
        if (val) {
            setServiceToAdd([...serviceToAdd, item]);
        } else {
            setServiceToAdd(
                serviceToAdd.filter((itemService) => itemService.id != item.id)
            );
        }
        return serviceToAdd.length;
    };
    const SaveClose = () => {
        handleSave(serviceToAdd);
        handleClose();
    };
    const handleClose = () => {
        setEditDialog(false);
    };

    return (
        <Grid
            container
            direction='column'
            justifyContent='center'
            alignItems='center'
        >
            <Grid item={3}>
                <IconButton onClick={extractAddServiceEdit}>
                    <AddIcon />
                </IconButton>
            </Grid>
            <Dialog open={editDialog} fullWidth={true} scroll='body'>
                <DialogTitle>
                    Edit Combo
                    <IconButton
                        aria-label='close'
                        onClick={handleClose}
                        size='medium'
                        sx={{
                            position: 'absolute',
                            right: 10,
                            top: 10,
                        }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        {!_isEmpty(serviceListAddable) &&
                            serviceListAddable.map((item) => (
                                <ComboItem
                                    key={item.id}
                                    item={item}
                                    handleServiceCheck={handleAddRemoveService}
                                    removeService={removeService}
                                    isEdit={true}
                                    choosenTime={false}
                                    serviceCheckList={serviceToAdd}
                                />
                            ))}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Grid container justifyContent='space-between'>
                        <Button onClick={SaveClose}>Save </Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </Grid>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};
