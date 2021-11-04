import * as React from "react";
import ServiceCardRow from "./serviceCardRow";
import Button from "@mui/material/Button";
import styled from "../../styles/service.module.css";
import Select from "@mui/material/Select";
import {useEffect, useState} from "react";
import { FormControl } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import SearchInput from "./search";
import AddServiceForm from "./addServiceForm";
import Box from "@mui/material/Box";
import Link from "next/link";

//possibly refactor the code to use more routing of next js and passing the parameter
// we can use regular react state or fetch the data with super agent  or use getStaticProps
const ServiceComponent = (props) => {
  const {serviceListData}= props;
  const [serviceListDisplay, setServiceListDisplay] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [sortServiceList, setSortServiceList] = useState(serviceListData);
  const [select, setSelect] = useState(-1);
  useEffect(() => {

  }, [select]);


  const handleSelectOrderBy = (val) => {
    let value = false;
    setSelect(val);
    switch (val) {
      case 2:
        if(searchResult.length > 0){
          setSearchResult(
              searchResult.sort((item1, item2) =>
                  item1.description.toLowerCase() > item2.description.toLowerCase()
                      ? 1
                      : item2.description.toLowerCase() >
                      item1.description.toLowerCase()
                          ? -1
                          : 0
              )
          );
        }
        else {
          setSortServiceList(
              serviceListData.sort((item1, item2) =>
                  item1.description.toLowerCase() > item2.description.toLowerCase()
                      ? 1
                      : item2.description.toLowerCase() >
                      item1.description.toLowerCase()
                          ? -1
                          : 0
              )
          );
          value = true;
        }
        break;
      case 1:
        if(searchResult.length > 0){
          setSearchResult(
              searchResult.sort((item1, item2) =>
                  item1.code.toLowerCase() > item2.code.toLowerCase()
                      ? 1
                      : item2.code.toLowerCase() > item1.code.toLowerCase()
                          ? -1
                          : 0
              )
          );
        }
        else {
          setSortServiceList(
              serviceListData.sort((item1, item2) =>
                  item1.code.toLowerCase() > item2.code.toLowerCase()
                      ? 1
                      : item2.code.toLowerCase() > item1.code.toLowerCase()
                          ? -1
                          : 0
              )
          );
          value = true;
        }
        break;
      case 3:
        if(searchResult.length > 0){
          setSearchResult(
              searchResult.sort((item1, item2) =>
                  item1.name.toLowerCase() > item2.name.toLowerCase()
                      ? 1
                      : item2.name.toLowerCase() > item1.name.toLowerCase()
                          ? -1
                          : 0
              )
          );
        }
        else {
          setSortServiceList(
              serviceListData.sort((item1, item2) =>
                  item1.name.toLowerCase() > item2.name.toLowerCase()
                      ? 1
                      : item2.name.toLowerCase() > item1.name.toLowerCase()
                          ? -1
                          : 0
              )
          );
          value = true;
        }
        break;
      default:
        if(searchResult.length > 0){
          setSearchResult(
              searchResult.sort(
                  (item1, item2) => item1.serviceId - item2.serviceId
              )
          );
        }
        else {
          setSortServiceList(
              serviceListData.sort(
                  (item1, item2) => item1.serviceId - item2.serviceId
              )
          );
          value = true;
        }
    }
    console.log(sortServiceList);
    setServiceListDisplay(value);
  };
  const handleSearch = (val) => {
    let searchValue = val.toLowerCase();
    let serviceResultList;
    if (val.trim().length > 0) {
      if(serviceListDisplay){
        serviceResultList = sortServiceList.filter(
            (item) =>
                item.code.includes(searchValue) ||
                item.name.includes(searchValue) ||
                item.description.includes(searchValue)
        );
        setServiceListDisplay(false);
      }
      else{
        serviceResultList = serviceListData.filter(
            (item) =>
                item.code.includes(searchValue) ||
                item.name.includes(searchValue) ||
                item.description.includes(searchValue)
        );
        setServiceListDisplay(false);
      }
    } else {
      serviceResultList = [];
      // setSortServiceList(serviceListData)
      handleSelectOrderBy('');
      setServiceListDisplay(true);
    }
    setSearchResult(serviceResultList);
  };

  //edit the service
  //add new employee
  return (
    <Box >
      <SearchInput handleSearch={handleSearch} />
      <div className={styled.separateVDiv}></div>
      <Button
          className={styled.addButton}
          variant="outlined"
      >
        <Link href={'service/add'} >
          <a>New Service</a>
        </Link>
      </Button>
      {/*{open && (*/}
      {/*  <AddServiceForm*/}
      {/*    handleClickOpen={handleClickOpen}*/}
      {/*    handleClose={handleClose}*/}
      {/*    open={open}*/}
      {/*  />*/}
      {/*)}*/}
      <div className={styled.flexAlignContainer}>
        <h1>Select a service</h1>
        <div className={styled.flexContainer}>
          <p>Order By</p>
          <div className={styled.separateHDiv}></div>
          {/*<FormControl>*/}
            <Select onChange={()=>handleSelectOrderBy(event.target.value)}>
              <MenuItem value={0}></MenuItem>
              <MenuItem value={1}>Service Code</MenuItem>
              <MenuItem value={2}>Description</MenuItem>
              <MenuItem value={3}>Name</MenuItem>
            </Select>
          {/*</FormControl>*/}
        </div>
      </div>

      <div>
        {searchResult.length > 0 &&
          searchResult.map((item) => (
            <ServiceCardRow key={item.serviceId} item={item} />
          ))}

        {serviceListDisplay && sortServiceList.map((item) => (
            <ServiceCardRow key={item.serviceId} item={item} />
          ))}
      </div>
    </Box>
  );
};

export default ServiceComponent;
