import * as React from 'react';
import { MenuList, MenuItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import Link from 'next/link';
import {
  AccessTime,
  AccountCircle,
  AddBox,
  Event,
  Healing,
  Receipt,
  Work,
} from '@mui/icons-material';

const Menu = () => {
  const menuItems = [
    {
      text: 'Appointment',
      icon: <AccessTime />,
      path: '/appointment',
    },
    {
      text: 'Client',
      icon: <AccountCircle />,
      path: '/client',
    },
    {
      text: 'Service',
      icon: <AddBox />,
      path: '/service',
    },
    {
      text: 'Employee',
      icon: <Work />,
      path: '/employee',
    },
    {
      text: 'Schedule',
      icon: <Event />,
      path: '/schedule',
    }
  ];
  return (
    <Box display='grid' sx={{
      background: '#c5c5c5',
      bottom: 0,
      height: '100%',
    }}>
      <MenuList>
        {menuItems.map((item) => (
          <Link key={item.text} href={item.path} passHref>
            <MenuItem sx={{
              marginBottom: '1em',

              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 500,
              fontSize: '1em',
            }}>
              <ListItemIcon sx={{ minWidth: '35px' }}>{item.icon}</ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Box>
  );
};
export default Menu;
