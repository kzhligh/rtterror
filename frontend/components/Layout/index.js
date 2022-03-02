import MainMenu from './menu';
import styled from '../../styles/layout.module.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Calendar from './calendar';
import { Divider, Grid } from '@mui/material';
import * as React from 'react';

const globalTheme = createTheme({
    typography: {
        fontFamily: 'Montserrat, sans-serif',
    },
});

const Layout = ({ children }) => {
    return (
        <ThemeProvider theme={globalTheme}>
            <Grid container direction="row" className={styled.bodyWrapper}>
                <Grid item style={{
                    display: "flex",
                    flexFlow: "column"
                }}>
                    <Calendar />
                    <Divider />
                    <MainMenu />
                </Grid>
                <Grid item style={{ minWidth: "75%", maxWidth: "85%" }}>
                    {/* <PrimarySearchAppBar /> */}
                    <Grid item className={styled.contentWrapper}>{children}</Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};
export default Layout;
