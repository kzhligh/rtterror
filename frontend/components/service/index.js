import * as React from "react";
import ServiceCardItem from "./serviceCardItem";
import Button from "@mui/material/Button";
import styled from "../../styles/service.module.css";
import Select from '@mui/material/Select';
import {useState} from "react";
import {FormControl, InputLabel, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import SearchInput from "./search";

// we can use regular react state or fetch the data with super agent  or use getStaticProps
const  ServiceComponent = (props)=>{
    const serviceList =[
        {serviceId:1, treatmentType: 'type1 ',name: 'name1 ',description: 'descriptiopn 1', price: 100 , duration: '1h30m', code:'code1', offerBy: [ 'E1','E2'],status:'blocked'},
        {serviceId:2, treatmentType: 'type1 ',name: 'name1 ',description: 'descriptiopn 1', price: 100 , duration: '1h30m', code:'code1', offerBy: [ 'E1','E2'],status:'active'},
        {serviceId:3, treatmentType: 'type1 ',name: 'name1 ',description: 'descriptiopn 1', price: 100 , duration: '1h30m', code:'code1', offerBy: [ 'E1','E2'],status:'blocked'},
        {serviceId:4, treatmentType: 'type1 ',name: 'name1 ',description: 'descriptiopn 1', price: 100 , duration: '1h30m', code:'code1', offerBy: [ 'E1','E2'],status:'active'},

    ];
    const [orderBy , setOrderBy] = useState('');
    const handleSelectOrderBy =(event)=>{

    }
    const {text} = props
    return(
        <box>
            <SearchInput />
            <div className={styled.separateHDiv}></div>
            <Button className={styled.addButton} variant='outlined' onClick={()=>alert('new service')}>Add New</Button>
            <div className={styled.flexAlignContainer}>
                <h1>Select a service</h1>
                <div className={styled.flexContainer}>
                <p>Order By</p>
                    <div className={styled.separateVDiv}></div>
            <FormControl >
                <Select
                    onChange={handleSelectOrderBy}
                >
                    <MenuItem value={''}></MenuItem>
                    <MenuItem value={'code'}>Service Code</MenuItem>
                    <MenuItem value={'description'}>Description</MenuItem>
                    <MenuItem value={'name'}>Name</MenuItem>
                </Select>
            </FormControl>
                </div>
            </div>
            {serviceList.map((item) => (
                <ServiceCardItem key={item.serviceId} item={item}/>
            ))}
        </box>
    )
}

// fetch the data from the back end without using the set prop, drawback not update
export async function getStaticProps() {
    var resstatus='';
    const res = await fetch('https://api.github.com/repos/visionmedia/superagent')
    resstatus = 'sucess'

    return {
        props: { text: resstatus }, // will be passed to the page component as props
    }
}

export default ServiceComponent;