import React, { useRef, useCallback, forwardRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Typography, MenuList, MenuItem, Autocomplete, TextField } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import 'tui-calendar/dist/tui-calendar.css';

import ScheduleDialog from "./scheduleDialog";
import _find from "lodash/find";
const TuiCalendar = dynamic(
    () => import('../TuiCalendar'),
    { ssr: false }
);

let TuiCalendarComponent = forwardRef((props, ref) => (
    <TuiCalendar {...props} forwardedRef={ref}/>
));
TuiCalendar.displayName = 'Schedule';

const ScheduleComponent =({employeeList,eventList,setRerender,rerender,employee,setEmployee}) =>{
    const cal = useRef(null);
    const [dialog, setDialog] = useState(false);
    const [schedule, setSchedule] = useState({});
    const [schedules, setSchedules] = useState(eventList);
    const [employees] = useState(employeeList);
    const [repeatDayChecked, setRepeatDayChecked] = useState([]);

    useEffect(()=>{
        setSchedules(eventList);
    },[eventList])

    const handleAddRepeatDayChecked = (val, day) => {
        if (val) {
            setRepeatDayChecked([...repeatDayChecked, day]);

        } else {
            setRepeatDayChecked(
                repeatDayChecked.filter(
                    (d) => d.id != day.id
                )
            );
        }
    };
    const handleSetSchedule = (e, emp)=>{
        const scheduleValue = {
            id: e.id,
            employee : emp ,
            start_date : e.start.toDate() ,
            end_date : e.end.toDate(),
            start_time : e.start.toDate(),
            end_time : e.end.toDate(),
            action : 'work',
            repeat: []
        }
        setSchedule(scheduleValue);
        setDialog(true);
    }
    const onClickSchedule = useCallback((e) => {
       const emp = _find(employees, ['id',e.schedule.calendarId]);
        handleSetSchedule(e.schedule,emp);
    }, [dialog]);

    const onBeforeCreateSchedule =(scheduleData) => {
        let empl = cal.current.props.employee;
        empl = Object.keys(empl).length == 0? employees[0]: empl;
        handleSetSchedule(scheduleData, empl);
        setDialog(true);
    }

    const onBeforeDeleteSchedule = useCallback((res) => {
        const { id, calendarId } = res.schedule;
        cal.current.calendarInst.deleteSchedule(id, calendarId);
    }, []);

    const onBeforeUpdateSchedule = useCallback((e) => {
        const emp = _find(employees, ['id',e.schedule.calendarId]);
        let sched = {...e.schedule};
        if(e.changes.start){
            sched.start = e.changes.start;
        }
        if(e.changes.end){
            sched.end = e.changes.end;
        }

        handleSetSchedule(sched,emp);
    }, []);


    useEffect(()=>{
        setSchedules( eventList);
    },[eventList])

    const changeCalendarView = (viewName) => {
        const calendar = cal.current.calendarInst;
        calendar.changeView(viewName, true);
        calendar.render();
    };

    const onClickDayname = useCallback((e) => {
        const calendar = cal.current.calendarInst;
        if (calendar.getViewName() === 'day') {
            calendar.changeView('week', true);
        } else if (calendar.getViewName() === 'week' || calendar.getViewName() === 'month') {
            const date = new Date(e.date);
            date.setDate(date.getDate() + 1);
            calendar.setDate(date);
            calendar.changeView('day', true);
        } else {
            return;
        }
        calendar.render();
    }, []);

    const handleFilterEmployee = (_event, selectedEmployee, reason) => {
        const calendar = cal.current.calendarInst;
        if (reason === "selectOption") {
            employees.forEach((emp) => {
                calendar.toggleSchedules(emp.id, true, false);
            });
            calendar.toggleSchedules(selectedEmployee.id, false, false);
            setEmployee({...selectedEmployee});
        } else if (reason === "clear") {
            employees.forEach((emp) => {
                calendar.toggleSchedules(emp.id, false, false);
            });
            setEmployee({});
        }
        calendar.render();

    };

    const handleClickPrevButton = () => {
        const calendar = cal.current.calendarInst;
        calendar.prev();
    };

    const handleClickNextButton = () => {
        const calendar = cal.current.calendarInst;
        calendar.next();
    };

    return (
        <>
            <Typography variant="h6">Schedule</Typography>
            <MenuList sx={{ display: 'flex', flexDirection: 'row', maxHeight: 64 }}>
                <MenuItem onClick={() => { cal.current.calendarInst.today(); changeCalendarView('day'); }}>Today</MenuItem>
                <MenuItem onClick={() => { changeCalendarView('week'); }}>Week</MenuItem>
                <MenuItem onClick={() => { changeCalendarView('month'); }}>Month</MenuItem>
                <MenuItem onClick={handleClickPrevButton}><ChevronLeft /></MenuItem>
                <MenuItem onClick={handleClickNextButton}><ChevronRight /></MenuItem>
                <MenuItem disabled />
                <Autocomplete
                    id="employee-calendar-filter"
                    disablePortal
                    clearOnEscape
                    openOnFocus
                    options={employees}
                    {...(employee.length > 0 && {defaultValue:employee})}
                    getOptionLabel={(option) => option.name}
                    onChange={handleFilterEmployee}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Employee" size="small" />}
                />
            </MenuList>
            <TuiCalendarComponent
                employee={employee}
                beforeSchedule={onBeforeCreateSchedule}
                ref={cal}
                view="week"
                taskView={false}
                scheduleView={['time']}
                week={{ hourStart: 8, hourEnd: 22 }}
                useCreationPopup={false}
                useDetailPopup={false}
                calendars={employees}
                schedules={schedules}
                onClickDayname={onClickDayname}
                onClickSchedule={onClickSchedule}
                onBeforeCreateSchedule={onBeforeCreateSchedule}
                onBeforeDeleteSchedule={onBeforeDeleteSchedule}
                onBeforeUpdateSchedule={onBeforeUpdateSchedule}
            />
            {dialog &&<ScheduleDialog
                dialog={dialog}
                setDialog={setDialog}
                event={schedule}
                employees={employees}
                handleAddRepeatDayChecked={handleAddRepeatDayChecked}
                repeatDayChecked={repeatDayChecked}
                setRepeatDayChecked={setRepeatDayChecked}
                setRerender={setRerender}
                rerender={rerender}
            />}
        </>
    );
}

export default ScheduleComponent;
