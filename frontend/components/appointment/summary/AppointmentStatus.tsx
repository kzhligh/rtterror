import { useState } from 'react';
import {
  InputLabel,
  Tooltip,
  Typography,
  Menu,
  IconButton,
  TextField,
  Box,
} from '@mui/material';
import { History } from '@mui/icons-material';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab';
import moment from 'moment';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { AppointmentStatusUpdatePopup } from './AppointmentStatusUpdatePopup';
import { IStatus } from '../common/appointmentInterfaces';

const filter = createFilterOptions();

export const AppointmentStatus = ({ statuses, updateStatus, expanded }) => {
  const [historyAnchor, setHistoryAnchor] = useState(null);
  const openHistory = Boolean(historyAnchor);
  const [openUpdateStatus, setOpenUpdateStatus] = useState(false);
  const [statusName, setStatusName] = useState('');

  const handleClickHistory = (event) => {
    setHistoryAnchor(event.currentTarget);
  };
  const handleCloseHistory = () => {
    setHistoryAnchor(null);
  };

  const timeline = (
    <Timeline position='left' sx={{ maxHeight: '45vh' }}>
      {statuses.map((status: IStatus) => (
        <Tooltip
          key={new Date(status.at).getTime()}
          title={`by ${status.by}`}
          enterDelay={0}
        >
          <TimelineItem
            style={{ cursor: 'default', backgroundColor: 'transparent' }}
          >
            <TimelineOppositeContent color='text.secondary'>
              <Typography variant='caption'>
                {moment(status.at).calendar()}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant='button'>{status.name}</Typography>
            </TimelineContent>
          </TimelineItem>
        </Tooltip>
      ))}
    </Timeline>
  );

  return (
    <Box display='grid'>
      <InputLabel style={{ marginTop: '5%' }}>
        Current Status: <span>&emsp;</span>
        <Typography variant='button' color='InfoText'>
          {statuses.length === 0 ? '' : statuses[0].name}
        </Typography>
        <span>&nbsp;</span>
        <IconButton
          onClick={handleClickHistory}
          size='small'
          disabled={expanded}
        >
          <History />
        </IconButton>
      </InputLabel>
      {!expanded ? (
        <Menu
          anchorEl={historyAnchor}
          id='account-menu'
          open={openHistory}
          onClose={handleCloseHistory}
        >
          {timeline}
        </Menu>
      ) : null}
      <Autocomplete
        value={statusName}
        onChange={(_event, newValue: any) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              setOpenUpdateStatus(true);
              setStatusName(newValue);
            });
          } else if (newValue && newValue.inputValue) {
            setOpenUpdateStatus(true);
            setStatusName(newValue.inputValue);
          } else {
            setStatusName(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push(params.inputValue);
          }

          return filtered;
        }}
        options={availableStatusNames}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option}</li>}
        size='small'
        freeSolo
        renderInput={(params) => (
          <TextField {...params} fullWidth label='New Status' autoFocus />
        )}
      />
      {expanded ? timeline : null}
      <AppointmentStatusUpdatePopup
        open={openUpdateStatus}
        toggleOpen={setOpenUpdateStatus}
        name={statusName}
        setName={setStatusName}
        updateStatus={updateStatus}
      />
    </Box>
  );
};

const availableStatusNames = [
  'Created',
  'Paid',
  'Updated',
  'Checked In',
  'Checked Out',
  'No Show',
  'Cancelled',
];
