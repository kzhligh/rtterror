import PrimarySearchAppBar from './appbar';
import MenuList from './menu';
import styled from '../../styles/layout.module.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Calendar from './calendar';
import { Divider } from '@mui/material';
import * as React from 'react';


const globalTheme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  }
});

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={globalTheme}>
      <div className={styled.bodyWrapper}>
        <div className={styled.sideBar}>
          <Calendar />
          <Divider />
          <MenuList />
        </div>
        <div className={styled.content}>
          <PrimarySearchAppBar />
          <div className={styled.contentWrapper}>{children}</div>
        </div>
      </div>
    </ThemeProvider>
  );
};
export default Layout;
