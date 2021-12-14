import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import {Close} from "@mui/icons-material";
import DialogContent from "@mui/material/DialogContent";
import {Checkbox, Chip, Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import DurationPrice from "../service/durationPrice";
import AddIcon from "@mui/icons-material/Add";
import styled from "../../styles/service.module.css";
import ServiceEmployeeTable from "../service/serviceEmployeeTable";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import * as React from "react";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const NewEmployeeDialog = (props)=>{
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        {
            title: 'The Lord of the Rings: The Return of the King',
            year: 2003,
        },
        { title: 'The Good, the Bad and the Ugly', year: 1966 },
        { title: 'Fight Club', year: 1999 },
        {
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            year: 2001,
        },
        {
            title: 'Star Wars: Episode V - The Empire Strikes Back',
            year: 1980,
        },
        { title: 'Forrest Gump', year: 1994 },
        { title: 'Inception', year: 2010 },
        {
            title: 'The Lord of the Rings: The Two Towers',
            year: 2002,
        },
        { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { title: 'Goodfellas', year: 1990 },
        { title: 'The Matrix', year: 1999 },
        { title: 'Seven Samurai', year: 1954 },
        {
            title: 'Star Wars: Episode IV - A New Hope',
            year: 1977,
        },
        { title: 'City of God', year: 2002 },
        { title: 'Se7en', year: 1995 },
        { title: 'The Silence of the Lambs', year: 1991 },
        { title: "It's a Wonderful Life", year: 1946 },
        { title: 'Life Is Beautiful', year: 1997 },
        { title: 'The Usual Suspects', year: 1995 },
        { title: 'Léon: The Professional', year: 1994 },
        { title: 'Spirited Away', year: 2001 },
        { title: 'Saving Private Ryan', year: 1998 },
        { title: 'Once Upon a Time in the West', year: 1968 },
        { title: 'American History X', year: 1998 },
        { title: 'Interstellar', year: 2014 },
    ];
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const {open , handleClose} =props;
    return (
        <div>
            <Dialog open={open} fullWidth={true} maxWidth="lg" scroll="body">
                <DialogTitle>
                    New Service
                </DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        direction="column"
                        alignItems="stretch"
                        spacing={3}
                    >
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="firstname"
                                label="firstname"
                                // onChange={(event) => handleSetValue(event)}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="lastname"
                                label="lastname"
                                // onChange={(event) => handleSetValue(event)}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="address"
                                label="address"
                                // onChange={(event) => handleSetValue(event)}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="phone"
                                label="phone"
                                // onChange={(event) => handleSetValue(event)}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="email"
                                // onChange={(event) => handleSetValue(event)}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Basic example"
                                    // value={value}
                                    onChange={(newValue) => {
                                       console.log(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={top100Films}
                                getOptionLabel={(option) => option.title}
                                defaultValue={[top100Films[13],top100Films[10]]}
                                filterSelectedOptions
                                autoHighlight
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Service"
                                        placeholder="Services"
                                    />
                                )}
                                onChange={(event, value)=>console.log(value)}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                    <Button onClick={()=>alert('create ')}>Add New Employee</Button>
                    <Button onClick={handleClose}>Close</Button>
                    </Grid>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default NewEmployeeDialog;