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
import {CustomDatePicker, DropDownList} from "../form/formComponent";
import {Button} from "@mui/material";
import {http} from "../../utils/http";

const SalaryCalculation =()=>{

    const [dataValue, setDataValue] = useState({});
    const handleSetDataValue = (obj) => {
        const {name, value} = obj.target;
        setDataValue({...dataValue, [name]: value});
    };
    const method = [
        {id: '0', value: 'timebase', title: 'Time Base'},
        {id: '1', value: 'fixprice', title: 'Fix Price'},
        {id: '2', value: 'comission', title: 'Commission Percentage'},
    ];
    const getMethodParam =()=>{
        switch (dataValue.method){
            case 'fixprice':
                return (<TextField
                    sx={{
                        minWidth: '300px',
                    }}
                    id="outlined-number"
                    name="fixedrate"
                    label="Fixed price per service"
                    variant="outlined"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={handleSetDataValue}
                    value={dataValue.fixedrate}
                />)
                break;
            case 'comission':
                return (<TextField
                    sx={{
                        minWidth: '300px',
                    }}
                    id="outlined-number"
                    name="comissionpercentage"
                    label="Comission percentage"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
                    variant="outlined"
                    onChange={handleSetDataValue}
                    value={dataValue.comissionpercentage}
                />)
                break;
            default:
                return (<TextField
                    sx={{
                        minWidth: '300px',
                    }}
                    id="outlined-number"
                    name="hourrate"
                    label="Hour Rate"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    variant="outlined"
                    onChange={handleSetDataValue}
                    value={dataValue.hourrate}
                />)
                break;
        }

    }
    const submitCalculation=async () => {
        //if date the same not
        console.log(dataValue)
        switch (dataValue.method) {
            case 'fixprice':
                delete dataValue.comissionpercentage;
                delete dataValue.hourrate;
                break;
            case 'comission':
                delete dataValue.fixedrate;
                delete dataValue.hourrate;
                break;
            default:
                delete dataValue.fixedrate;
                delete dataValue.comissionpercentage;
                break;
        }
        await http('/api/v1/schedules/salary', {
            method: 'GET',
            body: dataValue,
        });
        console.log(dataValue)
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
                            onChange={(e) =>
                                handleSetDataValue({target: {name: "method", value: e.target.value}})}
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
