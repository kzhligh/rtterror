import {
  MenuList,
  MenuItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
  InputLabel,
} from '@mui/material';
import { useRouter } from 'next/router';

export const AppointmentServiceList = ({
  services,
  therapistNames,
  therapists,
}) => {
  const router = useRouter();

  const gotoService = (serviceCode) => {
    router.push(
      {
        pathname: '/service/details',
        query: { servicecode: serviceCode },
      },
      '/service/details'
    );
  };

  return (
    <MenuList
      sx={{
        padding: 0,
      }}
    >
      {services.length === 0
        ? ''
        : services
            .map((serv, idx: number) => (
              <MenuItem
                key={serv.id}
                onClick={() => gotoService(serv.service_code)}
              >
                <ListItemAvatar>
                  <Avatar alt='Remy Sharp' src='' />
                </ListItemAvatar>
                <ListItemText
                  primary={serv.name}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component='span'
                        variant='body2'
                        color='text.primary'
                      >
                        {therapistNames[idx]}
                      </Typography>
                      — {serv.duration / 60000} min
                    </>
                  }
                />
              </MenuItem>
            ))
            .reduce(
              (prev, cur) => [
                prev,
                <Divider key='' variant='inset' component='li' />,
                cur,
              ],

              <InputLabel>Scheduled Services</InputLabel>
            )}
    </MenuList>
  );
};
