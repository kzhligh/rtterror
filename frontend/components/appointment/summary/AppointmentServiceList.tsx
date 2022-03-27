import * as React from 'react';
import {
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';

export const AppointmentServiceList = ({
  services,
  therapistNames,
  therapists,
}) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {!services.length
        ? ''
        : services
            .map((serv, idx: number) => (
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar alt='Remy Sharp' src='' />
                </ListItemAvatar>
                <ListItemText
                  primary={serv.name}
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
              (prev, cur) =>
                prev + <Divider variant='inset' component='li' /> + cur
            )}
    </List>
  );
};
