import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Close } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";
import {CardActionArea, CardHeader, Checkbox} from "@mui/material";
import ServiceCardRow from "./serviceCardRow";
import {Card} from "@mui/material";
import styled from "../../styles/service.module.css";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ServiceEmployee = (props) => {
    const { mode, item } = props;
    const elist = ['E1','E2','E3','E4','E5','E6','E7','E8']
    const [employeeList,setEmployeeList] = useState([]);
    const [employeeCheckList , setEmployeeCheckList] = useState(item.offerBy);
    console.log(employeeCheckList);
    const handleCheck =(e)=>{
        if(e.target.checked){
            setEmployeeCheckList([...employeeCheckList,e.target.value]);
        }
        else{
            setEmployeeCheckList(employeeCheckList.filter((name)=>e.target.value!=name));
        }
    }

    return (
        <div>
            <Card>
                <CardHeader sx={{ fontSize: 30 }} title={'Employee'} />
                <CardContent>
                    {elist.map((ename) => (
                        <div className={styled.employeeRowDiv}>
                        <label>{ename}</label>
                        <Checkbox
                            key={ename}
                            aria-label={ename}
                            value={ename}
                            checked={employeeCheckList?employeeCheckList.includes(ename):false}
                            onChange={(event)=>{handleCheck(event)}}
                            // inputProps={{ 'aria-label': 'controlled' }}
                        />
                        </div>
                    ))}
                </CardContent>
            </Card>
            {/*<Button*/}
            {/*    className={styled.buttonContainer}*/}
            {/*    variant={isBlock() ? "contained" : "outlined"}*/}
            {/*    onClick={() => toggleBlocked(item["serviceId"])}*/}
            {/*    style={{ backgroundColor: isBlock() ? "gray" : "white" }}*/}
            {/*>*/}
            {/*    {isBlock() ? "unblocked" : "blocked"}*/}
            {/*</Button>*/}
        </div>
    );
};
export default ServiceEmployee;
