import { useState } from 'react';
import {
  InputLabel,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Grid,
} from '@mui/material';
import { History, Edit } from '@mui/icons-material';
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

interface IStatus {
  name: string;
  by: string;
  at: Date;
}

export const AppointmentStatus = ({ statuses, setForm }) => {
  const [historyAnchor, setHistoryAnchor] = useState(null);
  const openHistory = Boolean(historyAnchor);
  const [openUpdateStatus, setOpenUpdateStatus] = useState(false);
  const handleClickHistory = (event) => {
    setHistoryAnchor(event.currentTarget);
  };
  const handleCloseHistory = () => {
    setHistoryAnchor(null);
  };

  return (
    <>
      <Grid
        container
        style={{ marginTop: '5%' }}
        justifyContent='space-between'
      >
        <InputLabel>
          Status
          <IconButton onClick={handleClickHistory} size='small'>
            <History />
          </IconButton>
        </InputLabel>
        <Typography variant='button' color='InfoText'>
          {statuses.length && statuses[statuses.length - 1].name}
          <IconButton onClick={() => setOpenUpdateStatus(true)} size='small'>
            <Edit />
          </IconButton>
        </Typography>
        <div></div>
      </Grid>
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
    </>
  );
};
