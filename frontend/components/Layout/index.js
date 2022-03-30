import Calendar from './calendar';
import MainMenu from './menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider, Box } from '@mui/material';

const globalTheme = createTheme({
    typography: {
        fontFamily: 'Montserrat, sans-serif',
    },
});

const Layout = ({ children }) => {
    return (
        <ThemeProvider theme={globalTheme}>
            <Box display='grid'
                gap={1}
                gridTemplateAreas={`"menu main main main main main main"`}
                gridAutoColumns='1fr'>
                <Box bgcolor='#888888'>
                    <Calendar />
                    <Divider />
                    <MainMenu />
                </Box>
                <Box gridArea='main'>
                    {children}
                </Box>
            </Box>
        </ThemeProvider >
    );
};
export default Layout;
