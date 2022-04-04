import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {Card, Checkbox, Grid, TextField} from "@mui/material";
import {CustomDatePicker, CustomTimePicker, DropDownList} from "../form/formComponent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import _find from "lodash/find";
import {http} from "../../utils/http";

const ScheduleDialog = (props)=>{

    const {dialog, setDialog, event , employees, handleAddRepeatDayChecked , repeatDayChecked , setRepeatDayChecked , rerender , setRerender} =props

    const [scheduleValue, setScheduleValue] = useState(event);

    const handleSave =async () => {
        const repeatedDay = repeatDayChecked.map(emp => emp.id);
        var data;
        const {id} = scheduleValue.employee;
        data = {
            start_date: scheduleValue.start_date.toDateString(),
            end_date: scheduleValue.end_date.toDateString(),
            start_time: scheduleValue.start_time.toTimeString().split(" ")[0],
            end_time: scheduleValue.end_time.toTimeString().split(" ")[0],
            action: scheduleValue.action,
            employeeId: id,
            repeatedDay: repeatedDay
        };

        if(scheduleValue.hasOwnProperty('id') && scheduleValue.id ){
            console.log({data: data});
            data.id = scheduleValue.id
            await http('/api/v1/schedules', {
                method: 'PUT',
                body: data,
            });
        }
        else{
            delete data.id;
            await http('/api/v1/schedules', {
                method: 'POST',
                body: data ,
            });
        }
        setRerender(!rerender);
        handleClose();
    }
    const handleDelete = async () => {
        const data = {
            id: scheduleValue.id
        };
        await http('/api/v1/schedules', {
            method: 'DELETE',
            body: data
        });
        setRerender(!rerender);

    }

    const handleClose = () =>{
        setDialog(false);
        setRepeatDayChecked([]);
    }
    const handleSetScheduleValue = (obj) => {
        const {name, value} = obj.target;
        setScheduleValue({...scheduleValue, [name]: value});
    };
    const repeatDayList = [
        {
            id : 1,
            day: 'mon',
            label: 'Monday'
        },
        {
            id : 2,
            day: 'tue',
            label: 'Tuesday'
        },
        {
            id : 3,
            day: 'web',
            label: 'Wednesday'
        },
        {
            id : 4,
            day: 'thu',
            label: 'Thursday'
        },
        {
            id : 5,
            day: 'fri',
            label: 'Friday'
        },
        {
            id : 6,
            day: 'sat',
            label: 'Saturday'
        },
        {
            id : 0,
            day: 'sun',
            label: 'Sunday'
        },
    ]

    const actionsList = [
        {id: '0', value: 'work', title: 'Work'},
        {id: '1', value: 'off', title: 'Off'},
    ];
    return (
        <div>
        <Dialog open={dialog} fullWidth={true} maxWidth="lg" scroll="body">
            <DialogTitle>
                New Work Schedule
            </DialogTitle>
            <DialogContent>
                <h1></h1>
                <Grid container direction="column" alignItems="stretch" spacing={2}>
                    <Autocomplete
                        label='employee'
                        name='employee'
                        options={employees}
                        getOptionLabel={(option) => `${option.name}`}
                        defaultValue={scheduleValue.employee || ""}
                        filterSelectedOptions
                        autoHighlight
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Employee"
                                placeholder="Employee"
                            />
                        )}
                        onChange={(_event, newValue) => handleSetScheduleValue({target: {name: 'employee', value: newValue}})}
                    />
                    <Grid item xs={12}>
                        <CustomDatePicker
                            name="start_date"
                            label="Start Date"
                            value={scheduleValue.start_date}
                            onChange={handleSetScheduleValue}
                        />
                        <CustomDatePicker
                            name="end_date"
                            label="End Date"
                            value={scheduleValue.end_date}
                            onChange={handleSetScheduleValue}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTimePicker
                            name="start_time"
                            label="Start Time"
                            value={scheduleValue.start_time}
                            onChange={handleSetScheduleValue}
                        />
                        <CustomTimePicker
                            name="end_time"
                            label="End Time"
                            value={scheduleValue.end_time}
                            onChange={handleSetScheduleValue}
                        />
                    </Grid>
                    {!scheduleValue.id && <Grid item xs={12}>
                        <Card>
                            <Grid container direction="row" alignItems="stretch" spacing={2}>
                                {repeatDayList.map((day) => (
                                    <Grid item xs={3} key={day.id}>
                                        <Checkbox
                                            value={day}
                                            checked={(_find(repeatDayChecked,day) != undefined)}
                                            onChange={(_event) => {
                                                handleAddRepeatDayChecked(_event.target.checked, day);
                                            }}
                                        />
                                        {day.label}
                                    </Grid>
                                ))}
                            </Grid>
                        </Card>
                    </Grid> }
                    <Grid item xs={12}>
                        <DropDownList
                            name="action"
                            label="Action"
                            value={scheduleValue.action}
                            onChange={handleSetScheduleValue}
                            list={actionsList}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave}>Save </Button>
                <Button onClick={handleDelete}>Delete </Button>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}
export default ScheduleDialog;