import { List, ListItem, ListItemIcon } from '@mui/material';
import styled from '../../styles/layout.module.css';
import Link from 'next/link';
import * as React from 'react';
import {
  AccessTime,
  AccountCircle,
  AddBox,
  Event,
  Healing,
  Receipt,
  Work,
} from '@mui/icons-material';

const CustomDrawer = () => {
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
    <List>
      {menuItems.map((item) => (
        <Link href={item.path}>
          <ListItem
            button
            key={item.text}
            data-cy={`${item.text}Route`}
            className={styled.drawerWrapper}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <a>{item.text}</a>
          </ListItem>
        </Link>
      ))}
    </List>
  );
};
export default CustomDrawer;
