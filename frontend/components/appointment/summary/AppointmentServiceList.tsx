import * as React from 'react';
import {
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
  InputLabel,
} from '@mui/material';

export const AppointmentServiceList = ({
  services,
  therapistNames,
  therapists,
}) => (
  <List
    sx={{
      padding: 0,
    }}
  >
    {services.length === 0
      ? ''
      : services
          .map((serv, idx: number) => (
            <ListItem key={serv.id} alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar alt='Remy Sharp' src='' />
              </ListItemAvatar>
              <ListItemText
                primary={serv.name + ' — ' + serv.duration / 60000 + 'min'}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      {therapistNames[idx]}
                    </Typography>
                    — {serv.description}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))
          .reduce(
            (prev, cur) => [
              prev,
              <Divider key='' variant='inset' component='li' />,
              cur,
            ],

            <InputLabel>Scheduled Services</InputLabel>
          )}
  </List>
);
