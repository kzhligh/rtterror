import * as React from "react";
import {useState} from "react";
import {CardHeader, Checkbox} from "@mui/material";
import {Card} from "@mui/material";
import styled from "../../styles/service.module.css";
import CardContent from "@mui/material/CardContent";

const ServiceEmployee = (props) => {
    const { mode, item, employeeCheckList ,setEmployeeCheckList } = props;
    const elist = ['E1','E2','E3','E4','E5','E6','E7','E8']
    const [employeeList,setEmployeeList] = useState([]);

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
                        />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};
export default ServiceEmployee;
