import _reduce from "lodash/reduce"
import _find from "lodash/find";

const formatSchedule = (events, employeesList) => {
    const formatedEvents = _reduce(events, (accumulator, event) => {
        let empName = _find(employeesList, ['id', event.employeeId]);
        empName = empName ? empName.name : '';
        const start = new Date(Date.parse(`${event.start_date} ${event.start_time}`));
        const end = new Date(Date.parse(`${event.end_date} ${event.end_time}`));
        return [...accumulator,
            {
                id: event.id,
                calendarId: event.employeeId,
                title: `${event.action} ${empName}`,
                category: 'time',
                dueDateClass: '',
                start: start,
                end: end
            }
        ];
    }, []);
    return formatedEvents;
}
export default formatSchedule;