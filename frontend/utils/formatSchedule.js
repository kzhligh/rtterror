import _reduce from "lodash/reduce"
import _find from "lodash/find";

const formatSchedule = (events, employeesList) => {
    return _reduce(events, (accumulator, event) => {
        let empName = _find(employeesList, ['id', event.employeeId]);
        empName = empName ? empName.name : '';
        return [...accumulator,
            {
                id: event.id,
                calendarId: event.employeeId,
                title: `${event.action} ${empName}`,
                category: 'time',
                dueDateClass: '',
                start: new Date(Date.parse(`${event.start_date} ${event.start_time}`)),
                end: new Date(Date.parse(`${event.end_date} ${event.end_time}`))
            }
        ];
    }, []);
}
export default formatSchedule;