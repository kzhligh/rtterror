import * as React from 'react';
import { List, ListItem, ListItemIcon } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

const theme = createTheme({
    components: {
        MuiList: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: '1 1 auto',

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

const MenuList = () => {
    const menuItems = [
        {
            text: 'Appointment',
            icon: <AccessTime />,
            path: '/appointment',
        },
        {
            text: 'Patient',
            icon: <AccountCircle />,
            path: '/patient',
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
export default MenuList;
