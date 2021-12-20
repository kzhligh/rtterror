import * as React from 'react';
import ServiceCardRow from './serviceCardRow';
import Button from '@mui/material/Button';
import styled from '../../styles/service.module.css';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import SearchInput from './search';
import Box from '@mui/material/Box';
import Link from 'next/link';
import ComboForm from './comboForm';

const ServiceComponent = (props) => {
  const { serviceListData, toggleBlocked, deleteService } = props;
  const [serviceListDisplay, setServiceListDisplay] = useState(serviceListData);
  // const [searchResult, setSearchResult] = useState([]);
  const [sortServiceList, setSortServiceList] = useState(serviceListData);
  const [select, setSelect] = useState('None');
  const [search, setSearch] = useState(false);
  const [serviceCheckList, setServiceCheckList] = useState([]); // the service to create the combo
  const sortedList = ['None', 'name', 'description', 'code'];
  const [comboDialog, setComboDialog] = useState(false);
  const [type, setType] = useState('');

  // console.log(serviceCheckList)
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
        serviceCheckList.filter((itemService) => itemService.id != item.id)
      );
    }
    // console.log(serviceCheckList)
    return serviceCheckList.length;
  };
  useEffect(() => {}, [select]);

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
        sortResult = serviceListDisplay.sort((item1, item2) =>
          item1.barcode.toLowerCase() > item2.barcode.toLowerCase()
            ? 1
            : item2.barcode.toLowerCase() > item1.barcode.toLowerCase()
            ? -1
            : 0
        );
        setServiceListDisplay(sortResult);
        break;
      case 'name':
        sortResult = serviceListDisplay.sort((item1, item2) =>
          item1.name.toLowerCase() > item2.name.toLowerCase()
            ? 1
            : item2.name.toLowerCase() > item1.name.toLowerCase()
            ? -1
            : 0
        );
        setServiceListDisplay(sortResult);
        break;
      case 'description':
        sortResult = serviceListDisplay.sort((item1, item2) =>
          item1.description.toLowerCase() > item2.description.toLowerCase()
            ? 1
            : item2.description.toLowerCase() > item1.description.toLowerCase()
            ? -1
            : 0
        );
        setServiceListDisplay(sortResult);
        break;
      default:
      // sortResult =serviceListData.sort(compareDateFunction);
      // setServiceListDisplay(sortResult);
    }
  };
  const handleSearch = (val) => {
    let searchList = select != 'id' ? sortServiceList : serviceListData;
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

  return (
    <Box>
      <SearchInput handleSearch={handleSearch} />
      <div className={styled.separateVDiv}></div>
      <Button className={styled.addButton} variant="outlined">
        <Link href={'/service/add'}>
          <a>New Service</a>
        </Link>
      </Button>
      <Button
        className={styled.addButton}
        variant="outlined"
        onClick={handleCreateCombo}
        disabled={serviceCheckList.length == 0}
      >
        Create Combo
      </Button>
      <div className={styled.flexAlignContainer}>
        <h1>Select a service</h1>
        <div className={styled.flexContainer}>
          <p>Order By</p>
          <div className={styled.separateHDiv}></div>
          <Select
            onChange={(event) => handleSelectOrderBy(event.target.value)}
            value={select}
          >
            {sortedList.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <div>
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
            setServiceCheckList={setServiceCheckList}
          />
        ))}
      </div>
      {serviceCheckList.length > 0 && (
        <ComboForm
          openDialog={comboDialog}
          handleCloseComboDialog={handleCloseComboDialog}
          serviceCheckList={serviceCheckList}
          handleServiceCheck={handleServiceCheck}
          type={type}
          setServiceCheckList={setServiceCheckList}
        ></ComboForm>
      )}
    </Box>
  );
};

export default ServiceComponent;
