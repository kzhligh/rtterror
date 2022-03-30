import * as React from 'react';
import cssStyled from '../../styles/service.module.css';
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    CardActionArea,
    Checkbox,
    Collapse,
    Chip,
    Stack,
    Typography,
    IconButton,
} from '@mui/material';
import {
    DeleteForeverRounded,
    DoNotDisturbOffOutlined,
    DoNotDisturbAltOutlined,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ComboForm from './comboForm';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import ColorHash from 'color-hash';
import { ConfirmDeleteDialog } from './ConfirmDeleteDialog';

const colorHash = new ColorHash();

const CardContentNoPadding = styled(CardContent)(`
  &:first-of-type {
    padding-top: 0;
  }
`);

const ServiceCardRow = (props) => {
    const router = useRouter();
    const {
        item: serviceItem,
        toggleBlocked,
        deleteService,
        serviceCheckList,
        handleServiceCheck,
        setType,
        setComboDetail,
        extractServiceCheckList,
        setServiceCheckList,
        comboDetail,
        serviceListData,
        refresh,
        setRefresh,
    } = props;
    const [editComboDialog, setEditComboDialog] = useState(false);
    const isBlocked = () => serviceItem.blocked;
    const isACombo = () => serviceItem.hasOwnProperty('services');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const detailsPage = () => {
        if (isACombo()) {
            setType('edit');
            setEditComboDialog(true);
            setComboDetail(serviceItem);
            extractServiceCheckList(serviceItem.services);
        } else {
            router.push(
                {
                    pathname: '/service/details',
                    query: { servicecode: serviceItem.service_code },
                },
                '/service/details'
            );
        }
    };
    const handleCloseEditDialog = () => {
        setEditComboDialog(false);
        setType('');
        setServiceCheckList([]);
    };
    const getCreateDate = (item) => {
        return new Date(item['createdAt']).toDateString();
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: `${colorHash.hex(serviceItem.service_code)}`,
            },
            // Used by `getContrastText()` to maximize the contrast between
            // the background and the text.
            contrastThreshold: 3,
        },
    });

    return (
        <Box display='grid'>
            <Card
                style={{ backgroundColor: isBlocked() ? '#888' : '#fff' }}
                sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                }}
                variant='outline'
            >
                <CardHeader
                    action={
                        <>
                            <IconButton color='error' onClick={() => setDeleteDialogOpen(true)}><DeleteForeverRounded /></IconButton>
                            <IconButton color='warning' onClick={() => toggleBlocked(serviceItem)}>
                                {isBlocked() ? <DoNotDisturbOffOutlined /> : <DoNotDisturbAltOutlined />}</IconButton>
                            {!isACombo() ? (
                                <Checkbox
                                    key={serviceItem.id}
                                    value={serviceItem}
                                    checked={serviceCheckList.includes(serviceItem)}
                                    onChange={(event) => {
                                        handleServiceCheck(event.target.checked, serviceItem);
                                    }}
                                    size='large'
                                    color='success'
                                />
                            ) : null}
                        </>
                    }
                    title={
                        <ThemeProvider theme={theme}>
                            <Chip
                                color='primary'
                                label={<Typography>
                                    {isACombo() ? 'Combo' : 'Service'}</Typography>}
                            />{' '}
                            {serviceItem.name}
                        </ThemeProvider>
                    }
                    subheader={
                        <>
                            <Chip label='Service Code' size='small' />{' '}
                            {serviceItem.service_code.split('-', 1)[0]}
                        </>
                    }
                />
                <Collapse in={!isBlocked()}>
                    <CardActionArea>
                        <CardContentNoPadding
                            onClick={() => detailsPage()}
                            sx={{ fontSize: 12 }}
                        >
                            <Stack
                                direction='row'
                                spacing={1}
                                justifyContent='flex-start'
                                alignItems='center'
                                mb={0.5}
                            >
                                <Chip label='Options' size='small' />
                                {isACombo() ? (
                                    <Typography variant='body2'>
                                        {serviceItem.total_duration} min
                                    </Typography>
                                ) : (
                                    <>
                                        {serviceItem.durations_prices.map((durPricePair, index) => (
                                            <Chip
                                                key={index}
                                                label={`${durPricePair.duration} MIN / ${durPricePair.price} CAD`}
                                                size='small'
                                                variant='outlined'
                                            />
                                        ))}
                                    </>
                                )}
                            </Stack>
                            <Stack
                                direction='row'
                                spacing={3}
                                justifyContent='flex-start'
                                alignItems='center'
                            >
                                <Chip label='Description' size='small' />
                                <Typography variant='body2'>
                                    {serviceItem.description}
                                </Typography>
                            </Stack>
                            <div className={cssStyled.separateVDiv} />
                            <div className={cssStyled.dateContainer}>
                                <Typography sx={{ fontSize: 12 }}>
                                    Created On : {getCreateDate(serviceItem)}
                                </Typography>
                            </div>
                        </CardContentNoPadding>
                    </CardActionArea>
                </Collapse>
            </Card>
            <ConfirmDeleteDialog
                open={deleteDialogOpen}
                setOpen={setDeleteDialogOpen}
                item={serviceItem}
                deleteService={deleteService}
            />
            {isACombo() && editComboDialog ? (
                <ComboForm
                    openDialog={editComboDialog}
                    handleCloseComboDialog={handleCloseEditDialog}
                    serviceCheckList={serviceCheckList}
                    handleServiceCheck={handleServiceCheck}
                    type='edit'
                    setServiceCheckList={setServiceCheckList}
                    comboDetail={comboDetail}
                    serviceListData={serviceListData}
                    setRefresh={setRefresh}
                    refresh={refresh}
                />
            ) : null}
        </Box>
    );
};
export default ServiceCardRow;
