import * as React from "react";
import ServiceCardRow from "./serviceCardRow";
import Button from "@mui/material/Button";
import styled from "../../styles/service.module.css";
import Select from "@mui/material/Select";
import {useEffect, useState} from "react";
import {Box, FormControl, InputLabel, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import SearchInput from "./search";
import ServiceForm from "./serviceForm";

// we can use regular react state or fetch the data with super agent  or use getStaticProps
const ServiceComponent = (props) => {
  const serviceListData = [
    {
      serviceId: 1,
      treatmentType: "type1 ",
      name: "name1 ",
      description: "descriptiopn 1",
      price: 100,
      duration: "1h30m",
      code: "code1",
      offerBy: ["E1", "E2"],
      status: "blocked",
    },
    {
      serviceId: 2,
      treatmentType: "type2 ",
      name: "name2 ",
      description: "descriptiopn 2",
      price: 100,
      duration: "1h30m",
      code: "code2",
      offerBy: ["E1", "E2"],
      status: "active",
    },
    {
      serviceId: 3,
      treatmentType: "type3 ",
      name: "name3 ",
      description: "descriptiopn 3",
      price: 100,
      duration: "1h30m",
      code: "code3",
      offerBy: ["E1", "E2"],
      status: "blocked",
    },
    {
      serviceId: 4,
      treatmentType: "type4 ",
      name: "name4 ",
      description: "descriptiopn 4",
      price: 100,
      duration: "1h30m",
      code: "code4",
      offerBy: ["E1", "E2"],
      status: "active",
    },
  ];
  const [orderBy, setOrderBy] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  useEffect(() => {
    setSearchResult(serviceListData)
  }, []);

  const handleSelectOrderBy = (event) => {
    // switch(event.target.value) {
    //   case 'description':
    //     // code block
    //     break;
    //   case 'code':
    //     // code block
    //     break;
    //   case 'name':
    //     // code block
    //     break;
    //   default:
    //     setServiceList(serviceList.s)
    //     // code block
    // }
  };
  const handleSearch = (event) => {
    // service code, name or description
    let searchValue = (event.target.value).toLowerCase();
    // console.log(searchValue)
    // alert(serviceListData[0].code.includes(searchValue));
    let serviceResultList = serviceListData.filter((item)=>(item.code.includes(searchValue)||item.name.includes(searchValue)||item.description.includes(searchValue)));
    console.log(serviceResultList)
    setSearchResult(serviceResultList);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  //want on change to search directly , empty to have all back
  //edit the service
  //add new employee
  return (
    <box>
      <SearchInput handleSearch={handleSearch}/>
      <div className={styled.separateHDiv}></div>
      <Button
        className={styled.addButton}
        variant="outlined"
        onClick={() => setOpen(true)}
      >
        Add New
      </Button>
      {open && <ServiceForm handleClickOpen={handleClickOpen} handleClose={handleClose} open={open}/>}
      <div className={styled.flexAlignContainer}>
        <h1>Select a service</h1>
        <div className={styled.flexContainer}>
          <p>Order By</p>
          <div className={styled.separateVDiv}></div>
          <FormControl>
            <Select onChange={handleSelectOrderBy}>
              <MenuItem value={""}></MenuItem>
              <MenuItem value={"code"}>Service Code</MenuItem>
              <MenuItem value={"description"}>Description</MenuItem>
              <MenuItem value={"name"}>Name</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div>
        {searchResult.length>0 && searchResult.map((item) => (
              <ServiceCardRow key={item.serviceId} item={item} />
          ))}
      {/*{serviceList.map((item) => (*/}
      {/*  <ServiceCardRow key={item.serviceId} item={item} />*/}
      {/*))}*/}
      </div>
    </box>
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
