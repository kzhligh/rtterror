import * as React from 'react';
import {
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
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
    },
    {
      text: 'Product',
      icon: <Healing />,
      path: '/product',
    },
    {
      text: 'Invoice',
      icon: <Receipt />,
      path: '/invoice',
    },
  ];
  return (
    <Paper
      sx={{
        background: '#c5c5c5',
        minHeight: '60%',
        bottom: 0,
      }}
    >
      <MenuList
        sx={{
          alignItems: 'center',
          flex: '1 1 auto',
        }}
      >
        {menuItems.map((item) => (
          <Link key={item.text} href={item.path} passHref>
            <MenuItem
              sx={{
                alignItems: 'center',
                paddingLeft: '25%',
                marginBottom: '15px',

                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 500,
                fontSize: 18,
              }}
            >
              <ListItemIcon sx={{ minWidth: '35px' }}>{item.icon}</ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Paper>
  );
};
export default Menu;
