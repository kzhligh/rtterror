import MenuList from './menu';
import styled from '../../styles/layout.module.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Calendar from './calendar';
import { Divider, Grid, Box } from '@mui/material';
import * as React from 'react';

const globalTheme = createTheme({
    typography: {
        fontFamily: 'Montserrat, sans-serif',
    },
});

const Layout = ({ children }) => {
    return (
        <ThemeProvider theme={globalTheme}>
            <Grid direction="row" className={styled.bodyWrapper}>
                <Box style={{ minHeight: "100%" }}>
                    <Calendar />
                    <Divider />
                    <MenuList />
                </Box>
                <Box style={{ minWidth: "75%", maxWidth: "85%" }}>
                    {/* <PrimarySearchAppBar /> */}
                    <div className={styled.contentWrapper}>{children}</div>
                </Box>
            </Grid>
        </ThemeProvider>
    );
};
export default Layout;
