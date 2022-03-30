import * as React from 'react';
import { useEffect, useState } from 'react';
import {
    Button,
    Select,
    MenuItem,
    InputLabel,
    Typography,
    Box,
    FormControl,
    Grid,
} from '@mui/material';
import Link from 'next/link';
import cssStyled from '/styles/service.module.css';
import SearchInput from './search';
import ServiceCardRow from './serviceCardRow';
import ComboForm from './comboForm';
import _orderBy from 'lodash/orderBy';

const ServiceComponent = (props) => {
    const {
        serviceListData,
        toggleBlocked,
        deleteService,
        refresh,
        setRefresh,
        comboList,
    } = props;
    const [serviceListDisplay, setServiceListDisplay] = useState(serviceListData);
    const [comboListDisplay, setComboListDisplay] = useState(comboList);
    const [sortServiceList, setSortServiceList] = useState(serviceListData);
    const [orderBy, setSelect] = useState('');
    const [search, setSearch] = useState(false);
    const [serviceCheckList, setServiceCheckList] = useState([]);

    const sortedList = ['name', 'description', 'code'];
    const [comboDialog, setComboDialog] = useState(false);
    const [type, setType] = useState('');
    const [comboDetail, setComboDetail] = useState({});

    const handleCloseComboDialog = () => {
        setComboDialog(false);
        setType('');
    };
    const handleCreateCombo = () => {
        setType('add');
        setComboDialog(true);
    };

    //to create the combo
    const handleServiceCheck = (val, item) => {
        if (val) {
            setServiceCheckList([...serviceCheckList, item]);
        } else {
            setServiceCheckList(
                serviceCheckList.filter(
                    (itemService) => itemService.service_code != item.service_code
                )
            );
        }
        return serviceCheckList.length;
    };
    // useEffect(() => { }, [orderBy]);

    const compareDateFunction = (item1, item2) => {
        const date1 = new Date(item1['createdAt']);
        const date2 = new Date(item2['createdAt']);

        if (date1 > date2) {
            return -1;
        } else if (date1 < date2) {
            return 1;
        } else {
            return 0;
        }
    };

    const handleSelectOrderBy = (val) => {
        let sortResult;
        setSelect(val);
        switch (val) {
            case 'code':
                sortResult = _orderBy(serviceListDisplay, 'service_code');
                setServiceListDisplay(sortResult);
                break;
            case 'name':
                sortResult = _orderBy(serviceListDisplay, 'name');
                setServiceListDisplay(sortResult);
                break;
            case 'description':
                sortResult = _orderBy(serviceListDisplay, 'description');
                setServiceListDisplay(sortResult);
                break;
            default:
                sortResult = _orderBy(serviceListDisplay, 'createdAt');
                setServiceListDisplay(sortResult);
        }
    };
    const handleSearch = (val) => {
        let searchList = orderBy != 'id' ? sortServiceList : serviceListData;
        let searchValue = val.toLowerCase();
        let serviceResultList;
        if (val.trim().length > 0) {
            setSearch(true);
            serviceResultList = searchList.filter(
                (item) =>
                    item.barcode.toLowerCase().includes(searchValue) ||
                    item.name.toLowerCase().includes(searchValue) ||
                    item.description.toLowerCase().includes(searchValue)
            );
            setServiceListDisplay(serviceResultList);
        } else {
            setSearch(false);
            setServiceListDisplay(serviceListData);
        }
    };

    const extractServiceCheckList = (serviceArray) => {
        let serviceCode = serviceArray.map((service) => service.service_code);
        let checkList = serviceListData.filter((item) =>
            serviceCode.includes(item.service_code)
        );
        setServiceCheckList(checkList);
    };

    return (
        <>
            <SearchInput handleSearch={handleSearch} />
            <Box className={cssStyled.flexAlignContainer}>
                <Typography variant='h6'>Select a service</Typography>
                <Link href={'/service/add'} passHref>
                    <Button
                        className={cssStyled.buttonContainer}
                        variant='outlined'
                        color='success'
                    >
                        New Service
                    </Button>
                </Link>
                <Button
                    className={cssStyled.buttonContainer}
                    variant='outlined'
                    color='secondary'
                    onClick={handleCreateCombo}
                    disabled={serviceCheckList.length === 0}
                >
                    Create Combo
                </Button>
                <FormControl size='small' sx={{ minWidth: 120 }}>
                    <InputLabel id='order-by-label'>
                        <Typography variant='button'>Order By</Typography>
                    </InputLabel>
                    <Select
                        labelId='order-by-label'
                        id='select-order-by'
                        value={orderBy}
                        label='Order By'
                        onChange={(event) => {
                            handleSelectOrderBy(event.target.value);
                        }}
                    >
                        <MenuItem value=''>none</MenuItem>
                        {sortedList.map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <>
                <Grid
                    container
                    direction='row'
                    justifyContent='space-evenly'
                    alignItems='flex-start'
                >
                    <Grid item xs={6}>
                        {serviceListDisplay.map((item) => (
                            <ServiceCardRow
                                key={item.id}
                                item={item}
                                toggleBlocked={toggleBlocked}
                                deleteService={deleteService}
                                serviceCheckList={serviceCheckList}
                                handleServiceCheck={handleServiceCheck}
                                type={type}
                                setType={setType}
                                extractServiceCheckList={extractServiceCheckList}
                                setServiceCheckList={setServiceCheckList}
                                setComboDetail={setComboDetail}
                                comboDetail={comboDetail}
                                serviceListData={serviceListData}
                                setRefresh={setRefresh}
                                refresh={refresh}
                            />
                        ))}
                    </Grid>
                    <Grid item xs={6}>
                        {comboListDisplay.map((item) => (
                            <ServiceCardRow
                                key={item.id}
                                item={item}
                                toggleBlocked={toggleBlocked}
                                deleteService={deleteService}
                                serviceCheckList={serviceCheckList}
                                handleServiceCheck={handleServiceCheck}
                                type={type}
                                setType={setType}
                                extractServiceCheckList={extractServiceCheckList}
                                setServiceCheckList={setServiceCheckList}
                                setComboDetail={setComboDetail}
                                comboDetail={comboDetail}
                                serviceListData={serviceListData}
                                setRefresh={setRefresh}
                                refresh={refresh}
                            />
                        ))}
                    </Grid>
                </Grid>
            </>
            {type == 'add' && (
                <ComboForm
                    openDialog={comboDialog}
                    handleCloseComboDialog={handleCloseComboDialog}
                    serviceCheckList={serviceCheckList}
                    handleServiceCheck={handleServiceCheck}
                    type={type}
                    comboDetail={comboDetail}
                    setServiceCheckList={setServiceCheckList}
                    setRefresh={setRefresh}
                    refresh={refresh}
                />
            )}
        </>
    );
};

export default ServiceComponent;
