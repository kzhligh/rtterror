import PrimarySearchAppBar from './appbar';
import MenuList from './menu';
import styled from '../../styles/layout.module.css';
import StaticDatePickerDemo from './calender';
import { Divider } from '@mui/material';
import * as React from 'react';

const Layout = ({ children }) => {
  return (
    <div className={styled.bodyWrapper}>
      <div className={styled.sideBar}>
        <StaticDatePickerDemo />
        <Divider />
        <MenuList />
      </div>
      <div className={styled.content}>
        <PrimarySearchAppBar />
        <div className={styled.contentWrapper}>{children}</div>
      </div>
    </div>
  );
};
export default Layout;
