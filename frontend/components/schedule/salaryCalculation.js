import * as React from "react";
import {useState} from "react";
import {
    Card,
    CardContent,
    CardActions,
    Grid,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    FormControl
} from "@mui/material";
import {CustomDatePicker} from "../form/formComponent";
import {Button} from "@mui/material";
import {http} from "../../utils/http";
import {SalaryCalculationFactory,Employee} from "../../utils/salaryCalculation";

const SalaryCalculation =({setRows})=>{
    var initValue = {
        start_date:new Date(),
        end_date: new Date(),
    }
    const [dataValue, setDataValue] = useState(initValue);
    const [methodString,setMethodString] = useState();
    const handleSetDataValue = (obj) => {
        console.log({name:name,value:value})
        const {name, value} = obj.target;
        setDataValue({...dataValue, [name]: value});
    };
    const method = [
        {id: '0', value: 'TimeBasedCalculation', title: 'Time Based Calculation'},
        {id: '1', value: 'ServiceBasedCalculation', title: 'Service Based Calculation'},
        {id: '2', value: 'CommissionBasedCalculation', title: 'Commission Based Calculation'},
    ];
    const getMethodParam =()=>{
        switch (dataValue.method){
            case 'ServiceBasedCalculation':
                return (<TextField
                    sx={{
                        minWidth: '300px',
                    }}
                    id="outlined-number"
                    name="ServiceBasedCalculation"
                    label="Fixed price per service"
                    variant="outlined"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={handleSetDataValue}
                    value={dataValue.ServiceBasedCalculation || 0}
                />)
                break;
            case 'CommissionBasedCalculation':
                return (<TextField
                    sx={{
                        minWidth: '300px',
                    }}
                    id="outlined-number"
                    name="CommissionBasedCalculation"
                    label="Comission percentage"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
                    variant="outlined"
                    onChange={handleSetDataValue}
                    value={dataValue.CommissionBasedCalculation || 0}
                />)
                break;
            default:
                return (<TextField
                    sx={{
                        minWidth: '300px',
                    }}
                    id="outlined-number"
                    name="TimeBasedCalculation"
                    label="Hour Rate"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    variant="outlined"
                    onChange={handleSetDataValue}
                    value={dataValue.TimeBasedCalculation || 0}
                />)
                break;
        }

    }
    const submitCalculation=async () => {
        var submitData = {};

        switch (dataValue.method) {
            case 'ServiceBasedCalculation':
                submitData.method = 'ServiceBasedCalculation';
                submitData.params = dataValue.ServiceBasedCalculation;
                break;
            case 'CommissionBasedCalculation':
                submitData.method = 'CommissionBasedCalculation';
                submitData.params = dataValue.CommissionBasedCalculation;
                break;
            default:
                submitData.method = 'TimeBasedCalculation';
                submitData.params = dataValue.TimeBasedCalculation;
                break;
        }

        if(!submitData.params){
            return
        }
        submitData.startDate = dataValue.start_date.toString().slice(0,15);
        submitData.endDate = dataValue.end_date.toString().slice(0,15);
        console.log(submitData)
        const appointmentList = await http('/api/v1/schedules/salary', {
            method: 'POST',
            body: submitData,
        });
        let appointmentByEmployeeList= {};
        let item = {};

        for(let i = 0 ; i< appointmentList.length;i++){
            item = {};
            let appointment = appointmentList[i];
            let employeeId = appointment.employees[0].id
            if(appointmentByEmployeeList.hasOwnProperty(employeeId)){
                item.appid =appointment.id ;
                item.appduration = appointment.duration;
                item.servicename=appointment.services[0].name;
                item.serviceprice=appointment.services[0].price;
                item.employeename = `${appointment.employees[0].first_name} ${appointment.employees[0].last_name}`
                appointmentByEmployeeList[employeeId] = appointmentByEmployeeList.employeeId.push(item);
            }
            else{
                item.appid =appointment.id ;
                item.appduration = appointment.duration;
                item.servicename=appointment.services[0].name;
                item.serviceprice=appointment.services[0].price;
                item.employeename = `${appointment.employees[0].first_name} ${appointment.employees[0].last_name}`
                appointmentByEmployeeList[employeeId] = [item];

            }
        }
        var employeeStrategy, context;
        var rows = [];
        var row={};
        for(const empId in appointmentByEmployeeList){
            row={};
            employeeStrategy = SalaryCalculationFactory.createObject(submitData.method, appointmentByEmployeeList[empId], submitData.params);
            context = new Employee(employeeStrategy);
            console.log("Client: Strategy is set to CommissionBasedCalculation.");
            context.setStrategy(employeeStrategy);
            row.id = empId
            row.employee = appointmentByEmployeeList[empId][0].employeename
            row.earn = context.calculateSalary();
            rows.push(row);
        }
        setRows(rows);
    }


    return (
        <Card>
            <CardContent>
            <Grid
                container
                direction="row"
                spacing={1}
            >
                <Grid item xs={6}>
                    <CustomDatePicker
                        name="start_date"
                        label="Start Date"
                        value={dataValue.start_date}
                        onChange={handleSetDataValue}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomDatePicker
                        name="end_date"
                        label="End Date"
                        value={dataValue.end_date}
                        onChange={handleSetDataValue}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl
                        sx={{
                            marginX: '10px',
                        }}
                    >
                        <InputLabel>Method of calculation</InputLabel>
                        <Select
                            value={dataValue.method}
                            onChange={(e) => {
                                handleSetDataValue({target: {name: "method", value: e.target.value}});
                            }}
                            sx={{
                                minWidth: '300px',
                            }}
                        >
                            {method.map((val) => (
                                <MenuItem key={val.id} value={val.value}>
                                    {val.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    {getMethodParam()}
                </Grid>
            </Grid>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={submitCalculation}>Submit</Button>
            </CardActions>
        </Card>

    );
}
export default SalaryCalculation;
