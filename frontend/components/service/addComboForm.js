import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import {Close, ClosedCaptionRounded} from "@mui/icons-material";
import DialogContent from "@mui/material/DialogContent";
import styled from "../../styles/service.module.css";
import TextField from "@mui/material/TextField";
import {
    CardHeader,
    Checkbox,
    Fab,
    InputAdornment, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Paper from "@mui/material/Paper";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";

const ComboItem = (props)=>{
    const {item ,handleServiceCheck} = props
    return (<Card>
        <div className={styled.flexAlignContainer}>
            <div><Stack><h4>name</h4><h4>code</h4></Stack></div>

            <div><Stack direction="row" spacing={2}><h4>duration price</h4><Close onClick={handleServiceCheck}></Close></Stack></div>

        </div>
    </Card>)
}

const AddComboForm =(props)=>{
    const {openDialog , handleCloseComboDialog, serviceCheckList} = props
    return (<div>
        <Dialog open={openDialog} fullWidth={true} maxWidth="lg" scroll="body">
            <DialogTitle>
                New Combo
                <IconButton
                    aria-label="close"
                    onClick={handleCloseComboDialog}
                    size="medium"
                    sx={{
                        position: 'absolute',
                        right: 10,
                        top: 10,
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2}>

                    <TextField
                        fullWidth
                        required
                        id="name"
                        label="Service name"
                        // value={name}
                        // onChange={(event) => handleSetValue(event)}
                    />
                    {serviceCheckList.map((item) => (
                        <ComboItem item={item} handleServiceCheck={handleServiceCheck}/>
                    ))}
                    <div className={styled.flexAlignContainer}><label>Total Duration: </label>
                        <TextField
                            required
                            id="name"
                            label="Service name"
                            // value={name}
                            // onChange={(event) => handleSetValue(event)}
                        /></div>

                    <div className={styled.flexAlignContainer}><label>Total Duration: </label>
                        <TextField
                            required
                            id="name"
                            label="Service name"
                            // value={name}
                            // onChange={(event) => handleSetValue(event)}
                        /></div>
                </Stack>
            </DialogContent>
            <DialogActions>
                <div className={styled.flexSpaceBetween}>
                    <Button onClick={handleCloseComboDialog}>Create </Button>
                    <Button onClick={handleCloseComboDialog}>Cancel</Button>
                </div>
            </DialogActions>
        </Dialog>
    </div>);
}
export default AddComboForm;