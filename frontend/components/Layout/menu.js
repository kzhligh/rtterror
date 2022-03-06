import * as React from 'react';
import {
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Paper,
  List,
  ListItem,
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
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',

          background: '#c5c5c5',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: '25%',
          marginBottom: '15px',

          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 500,
          fontSize: 18,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '35px',
        },
      },
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <List>
        {menuItems.map((item) => (
          <Link key={item.text} href={item.path}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <a>{item.text}</a>
            </ListItem>
          </Link>
        ))}
      </List>
    </ThemeProvider>
  );
};
export default Menu;
