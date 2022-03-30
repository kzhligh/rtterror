import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';

const theme = createTheme({
    typography: {
        fontFamily: 'Montserrat, sans-serif',
        color: 'white',
        fontSize: 16,
    },
    components: {
        MuiPickerStaticWrapper: {
            styleOverrides: {
                root: {
                    color: 'white',
                    background: '#888888',
                    height: '100%',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: 'white',
                    ':hover': {
                        backgroundColor: 'rgba(255,255,255,0.4)',
                    },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontWeight: 'bold',
                    color: 'rgba(255,255,255,1)',
                },
            },
        },
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    color: 'white',
                    background: '#888888',
                    fontSize: 14,
                    height: 36,
                    '&.Mui-selected': {
                        fontWeight: 'bold',
                        color: 'black',
                        background: '#E8E8E8',
                        ':hover': {
                            backgroundColor: 'rgba(255,255,255,0.4)',
                        },
                    },
                    ':hover': {
                        color: 'black',
                        backgroundColor: 'rgba(255,255,255,0.4)',
                    },
                },
            },
        },
    },
});

const Calendar = () => {
    const [date, setDate] = useState(new Date());

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    // openTo="year"
                    value={date}
                    onChange={(newDate) => {
                        setDate(newDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
};
export default Calendar;
