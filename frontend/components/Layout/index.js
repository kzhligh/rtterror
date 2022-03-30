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
        <Box display='grid'
            gap={1}
            gridTemplateAreas={`"menu main main main"`}
            gridAutoColumns='1fr'>
            <Box bgcolor='#c5c5c5'>
                <ThemeProvider theme={globalTheme}>
                    <Calendar />
                    <Divider />
                    <MainMenu />
                </ThemeProvider>
            </Box>
            <Box gridArea='main'>
                <ThemeProvider theme={globalTheme}>
                    {children}
                </ThemeProvider>
            </Box>
        </Box>
    );
};
export default Layout;
