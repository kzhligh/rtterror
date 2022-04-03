import {
    createTheme,
    ThemeProvider,
} from '@mui/material/styles';
import { Box, Divider } from '@mui/material';
import MainMenu from './menu';
import Calendar from './calendar';
import { useState } from 'react';
import { Drawer } from './Drawer';

const globalTheme = createTheme({
    typography: {
        fontFamily: 'Montserrat, sans-serif',
    },
});

export
    const Layout = ({ children }) => {
        const [open, setOpen] = useState(false);

        return (
            <ThemeProvider theme={globalTheme}>
                <Box display='flex'>
                    <Drawer
                        variant='permanent'
                        open={open}
                        onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
                    >
                        <Calendar />
                        <Divider>Clinique yuanQi Massage &amp; Acupuncture</Divider>
                        <MainMenu />
                    </Drawer>
                    <Divider orientation="vertical" flexItem />
                    <Box component='main' sx={{ flexGrow: 1, p: 3 }} bgcolor='#fff'>
                        {children}
                    </Box>
                </Box>
            </ThemeProvider>
        );
    };
export default Layout;
