import PrimarySearchAppBar from './appbar';
import CustomDrawer from './drawer';
import styled from '../../styles/layout.module.css';
import DatePicker from './calender';
import { Divider } from '@mui/material';
import * as React from 'react';

const Layout = ({ children }) => {
  return (
    <div className={styled.bodyWrapper}>
      <div className={styled.sideBar}>
        <DatePicker />
        <Divider />
        <CustomDrawer />
      </div>
      <div className={styled.content}>
        <PrimarySearchAppBar />
        <div className={styled.contentWrapper}>{children}</div>
      </div>
    </div>
  );
};
export default Layout;
