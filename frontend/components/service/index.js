import * as React from "react";
import ServiceCardRow from "./serviceCardRow";
import Button from "@mui/material/Button";
import styled from "../../styles/service.module.css";
import Select from "@mui/material/Select";
import { useState } from "react";
import { FormControl } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import SearchInput from "./search";
import ServiceForm from "./serviceForm";
import Box from "@mui/material/Box";

//possibly refactor the code to use more routing of next js and passing the parameter
// we can use regular react state or fetch the data with super agent  or use getStaticProps
const ServiceComponent = () => {
  const serviceListData = [
    {
      serviceId: 1,
      treatmentType: "type1 ",
      name: "z ",
      description: "d",
      price: 100,
      duration: "1h30m",
      code: "code1",
      offerBy: ["E1", "E2"],
      status: "blocked",
      dateCreated: "2018 / 10/ 02",
    },
    {
      serviceId: 2,
      treatmentType: "type2 ",
      name: "a ",
      description: "c",
      price: 100,
      duration: "1h30m",
      code: "code2",
      offerBy: ["E1", "E2"],
      status: "active",
      dateCreated: "2018 / 10/ 03",
    },
    {
      serviceId: 3,
      treatmentType: "type3 ",
      name: "x ",
      description: "b",
      price: 100,
      duration: "1h30m",
      code: "code3",
      offerBy: ["E1", "E2"],
      status: "blocked",
      dateCreated: "2018 / 10/ 04",
    },
    {
      serviceId: 4,
      treatmentType: "type4 ",
      name: "y",
      description: "a",
      price: 100,
      duration: "1h30m",
      code: "code4",
      offerBy: ["E1", "E2"],
      status: "active",
      dateCreated: "2018 / 10/ 08",
    },
  ];
  const [serviceListDisplay, setServiceListDisplay] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [serviceList, setServiceList] = useState(serviceListData);

  const handleSelectOrderBy = (event) => {
    switch (event.target.value) {
      case 2:
        setServiceList(
          serviceListData.sort((item1, item2) =>
            item1.description.toLowerCase() > item2.description.toLowerCase()
              ? 1
              : item2.description.toLowerCase() >
                item1.description.toLowerCase()
              ? -1
              : 0
          )
        );
        break;
      case 1:
        setServiceList(
          serviceListData.sort((item1, item2) =>
            item1.code.toLowerCase() > item2.code.toLowerCase()
              ? 1
              : item2.code.toLowerCase() > item1.code.toLowerCase()
              ? -1
              : 0
          )
        );
        break;
      case 3:
        setServiceList(
          serviceListData.sort((item1, item2) =>
            item1.name.toLowerCase() > item2.name.toLowerCase()
              ? 1
              : item2.name.toLowerCase() > item1.name.toLowerCase()
              ? -1
              : 0
          )
        );
        break;
      default:
        setServiceList(
          serviceListData.sort(
            (item1, item2) => item1.serviceId - item2.serviceId
          )
        );
    }
    // console.log(serviceList);
    setServiceListDisplay(true);
  };
  const handleSearch = (val) => {
    let searchValue = val.toLowerCase();
    let serviceResultList;
    if (val.trim().length > 0) {
      serviceResultList = serviceListData.filter(
        (item) =>
          item.code.includes(searchValue) ||
          item.name.includes(searchValue) ||
          item.description.includes(searchValue)
      );
      setServiceListDisplay(false);
    } else {
      serviceResultList = [];
      setServiceListDisplay(true);
    }
    setSearchResult(serviceResultList);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        onClick={() => setOpen(true)}
      >
        Add New
      </Button>
      {open && (
        <ServiceForm
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
        />
      )}
      <div className={styled.flexAlignContainer}>
        <h1>Select a service</h1>
        <div className={styled.flexContainer}>
          <p>Order By</p>
          <div className={styled.separateHDiv}></div>
          <FormControl>
            <Select onChange={handleSelectOrderBy}>
              <MenuItem value={0}></MenuItem>
              <MenuItem value={1}>Service Code</MenuItem>
              <MenuItem value={2}>Description</MenuItem>
              <MenuItem value={3}>Name</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div>
        {searchResult.length > 0 &&
          searchResult.map((item) => (
            <ServiceCardRow key={item.serviceId} item={item} />
          ))}
        {serviceListDisplay &&
          serviceList.map((item) => (
            <ServiceCardRow key={item.serviceId} item={item} />
          ))}
      </div>
    </Box>
  );
};

// fetch the data from the back end without using the set prop, drawback not update
export async function getStaticProps() {
  var resstatus = "";
  const res = await fetch(
    "https://api.github.com/repos/visionmedia/superagent"
  );
  resstatus = "sucess";

  return {
    props: { text: resstatus }, // will be passed to the page component as props
  };
}

export default ServiceComponent;
