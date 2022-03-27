import { useState } from 'react';
import {
  InputLabel,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  TextField,
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

const filter = createFilterOptions();

interface IStatus {
  name: string;
  by: string;
  at: Date;
}

export const AppointmentStatus = ({ statuses, setForm }) => {
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

  return (
    <>
      <InputLabel style={{ marginTop: '5%' }}>
        Current Status: <span>&emsp;</span>
        <Typography variant='button' color='InfoText'>
          {!statuses.length ? '' : statuses[statuses.length - 1].name}
        </Typography>
        <span>&nbsp;</span>
        <IconButton onClick={handleClickHistory} size='small'>
          <History />
        </IconButton>
      </InputLabel>
      <Menu
        anchorEl={historyAnchor}
        id='account-menu'
        open={openHistory}
        onClose={handleCloseHistory}
      >
        <Timeline position='left'>
          {statuses.map((status: IStatus) => (
            <MenuItem
              disableRipple
              style={{ cursor: 'default', backgroundColor: 'transparent' }}
            >
              <Tooltip title={`by ${status.by}`} enterDelay={0}>
                <TimelineItem>
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
            </MenuItem>
          ))}
        </Timeline>
      </Menu>
      <Autocomplete
        value={statusName}
        onChange={(event, newValue: any) => {
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
      <AppointmentStatusUpdatePopup
        open={openUpdateStatus}
        toggleOpen={setOpenUpdateStatus}
        name={statusName}
        setName={setStatusName}
      />
    </>
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
