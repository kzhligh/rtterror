import { InputLabel } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab';

export const AppointmentStatus = ({ statuses, setForm }) => (
  <>
    <InputLabel style={{ marginTop: '5%' }}>Status</InputLabel>
    <Timeline position='left'>
      {console.log(statuses)}{' '}
      {statuses.map(() => (
        <TimelineItem>
          <TimelineOppositeContent color='text.secondary'>
            09:30 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>Eat</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  </>
);
