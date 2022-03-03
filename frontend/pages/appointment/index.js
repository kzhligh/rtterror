import React, { useRef, useCallback, forwardRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'tui-calendar/dist/tui-calendar.css';
// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { Typography, MenuList, MenuItem, Autocomplete, TextField } from '@mui/material';

import EditAppointmentDialog from '../../components/appointment/editAppointmentDialog';
import DropConfirmationDialog from '../../components/appointment/dropConfirmationDialog';
const TuiCalendarWrapper = dynamic(() => import('../../components/appointment/TuiCalendarWrapper'), { ssr: false });
const TuiCalendar = forwardRef((props, ref) => (
  <TuiCalendarWrapper {...props} forwardedRef={ref} />
));
TuiCalendar.displayName = 'TuiCalendar';

import templates from './TuiTemplateConfig';

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));

const calendars = [
  {
    id: '1',
    name: 'Employee X',
    color: '#ffffff',
    bgColor: '#9e5fff',
    dragBgColor: '#9e5fff',
    borderColor: '#9e5fff',
  },
  {
    id: '2',
    name: 'Employee Y',
    color: '#ffffff',
    bgColor: '#00a9ff',
    dragBgColor: '#00a9ff',
    borderColor: '#00a9ff',
  },
];

function Appointment() {
  const cal = useRef(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDropDialog, setOpenDropDialog] = useState(false);

  const [clickTarget, setClickTarget] = useState({ employeeId: 0, scheduleId: 0 });
  const [updateEvent, setUpdateEvent] = useState(null);

  const [schedules, setSchedules] = useState([]);

  const onClickSchedule = useCallback((e) => {
    console.log('onClickSchedule');
    const { calendarId: employeeId, id: scheduleId } = e.schedule;
    setClickTarget({ employeeId: employeeId, scheduleId: scheduleId });
    console.log(employeeId, scheduleId);

    // TODO: edit existing appointment

    setOpenEditDialog(true);
    console.log(openEditDialog);
  }, []);

  const onBeforeCreateSchedule = useCallback((scheduleData) => {
    console.log('onBeforeCreateSchedule');
    console.log(scheduleData);

    const schedule = {
      id: String(Math.random()),
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      start: scheduleData.start,
      end: scheduleData.end,
      category: scheduleData.isAllDay ? "allday" : "time",
      dueDateClass: "",
      location: scheduleData.location,
      state: scheduleData.state
    };

    cal.current.calendarInst.createSchedules([schedule]);
    // TODO: create schedule

    setOpenEditDialog(true);
  }, []);

  const onBeforeDeleteSchedule = useCallback((res) => {
    console.log('onBeforeDeleteSchedule');
    console.log(res);

    const { id, calendarId } = res.schedule;

    cal.current.calendarInst.deleteSchedule(id, calendarId);

    // TODO: delete schedule
  }, []);

  const onBeforeUpdateSchedule = useCallback((e) => {
    console.log('onBeforeUpdateSchedule');
    console.log(e);

    setUpdateEvent(e);
    setOpenDropDialog(true);
  }, []);

  const handleConfirmUpdateSchedule = (ok) => {
    setOpenDropDialog(false);

    if (ok && updateEvent) {
      const { schedule, changes } = updateEvent;

      cal.current.calendarInst.updateSchedule(
        schedule.id,
        schedule.calendarId,
        changes
      );
    }

    setUpdateEvent(null);
  };

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
  });

  return (
    <>
      <Typography variant="h6">Appointment</Typography>
      <MenuList sx={{ display: 'flex', flexDirection: 'row', maxHeight: 64 }}>
        <MenuItem onClick={() => { cal.current.calendarInst.today(); changeCalendarView('day'); }}>Today</MenuItem>
        <MenuItem onClick={() => { changeCalendarView('week'); }}>Week</MenuItem>
        <MenuItem onClick={() => { changeCalendarView('month'); }}>Month</MenuItem>
        <MenuItem disabled />
        <Autocomplete
          disablePortal
          clearOnEscape
          openOnFocus
          options={[
            { label: 'Employee XYZ', id: 1994 },
            { label: 'Therapist IOT', id: 1972 },
            { label: 'Junior Physician STAR', id: 1974 }
          ]}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Employee" size="small" />}
        />
      </MenuList>
      <TuiCalendar
        ref={cal}
        view="week"
        taskView={false}
        useCreationPopup={false}
        useDetailPopup={false}
        template={templates}
        calendars={calendars}
        schedules={schedules}
        onClickSchedule={onClickSchedule}
        onBeforeCreateSchedule={onBeforeCreateSchedule}
        onBeforeDeleteSchedule={onBeforeDeleteSchedule}
        onBeforeUpdateSchedule={onBeforeUpdateSchedule}
        onClickDayname={onClickDayname}
      />
      <EditAppointmentDialog openEditDialog={openEditDialog} setOpenEditDialog={setOpenEditDialog} onSubmit={onBeforeUpdateSchedule} target={schedules.find(el => el.id === clickTarget.scheduleId)} />
      <DropConfirmationDialog open={openDropDialog} onClose={handleConfirmUpdateSchedule} changes={updateEvent?.changes} />
    </>
  );
}

export default Appointment;
