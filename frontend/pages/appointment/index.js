import React, { useRef, useCallback, forwardRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'tui-calendar/dist/tui-calendar.css';
// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import { Typography } from '@material-ui/core';

import EditAppointmentDialog from '../../components/appointment/editAppointmentDialog';
const TuiCalendarWrapper = dynamic(() => import('../../components/appointment/TuiCalendarWrapper'), { ssr: false });
const TuiCalendar = forwardRef((props, ref) => (
  <TuiCalendarWrapper {...props} forwardedRef={ref} />
));
TuiCalendar.displayName = 'TuiCalendar';

import templates from './TuiTemplateConfig';

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 30));
const schedules = {
  '1': {
    calendarId: '1',
    category: 'time',
    isVisible: true,
    title: 'Study',
    id: '1',
    body: `${start}`,
    start,
    end,
    more: {}
  },
  '2': {
    calendarId: '2',
    category: 'time',
    isVisible: true,
    title: 'Meeting',
    id: '2',
    body: 'Description',
    start: new Date(new Date().setHours(start.getHours() + 1)),
    end: new Date(new Date().setHours(start.getHours() + 2)),
  },
};

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
  const [clickTarget, setClickTarget] = useState({ employeeId: 0, scheduleId: 0 });

  const onClickSchedule = useCallback((e) => {
    const { calendarId: employeeId, id: scheduleId } = e.schedule;
    setClickTarget({ employeeId: employeeId, scheduleId: scheduleId });
    console.log(employeeId, scheduleId);
    const el = cal.current.calendarInst.getElement(scheduleId, employeeId);
    console.log(cal.current.calendarInst);
    console.log(el);
    console.log(e, el.getBoundingClientRect());

    setOpenEditDialog(true);
    console.log(openEditDialog);
  }, []);

  const onBeforeCreateSchedule = useCallback((scheduleData) => {
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
  }, []);

  const onBeforeDeleteSchedule = useCallback((res) => {
    console.log(res);

    const { id, calendarId } = res.schedule;

    cal.current.calendarInst.deleteSchedule(id, calendarId);
  }, []);

  const onBeforeUpdateSchedule = useCallback((e) => {
    console.log(e);

    const { schedule, changes } = e;

    cal.current.calendarInst.updateSchedule(
      schedule.id,
      schedule.calendarId,
      changes
    );
  }, []);

  return (
    <>
      <Typography variant="h6">Appointment</Typography>
      <TuiCalendar
        ref={cal}
        view="day"
        useCreationPopup={true}
        useDetailPopup={true}
        template={templates}
        calendars={calendars}
        schedules={Object.values(schedules)}
        onClickSchedule={onClickSchedule}
        onBeforeCreateSchedule={onBeforeCreateSchedule}
        onBeforeDeleteSchedule={onBeforeDeleteSchedule}
        onBeforeUpdateSchedule={onBeforeUpdateSchedule}
      />
      <EditAppointmentDialog openEditDialog={openEditDialog} setOpenEditDialog={setOpenEditDialog} onSubmit={onBeforeUpdateSchedule} target={schedules[clickTarget.scheduleId]} />
    </>
  );
}

export default Appointment;
