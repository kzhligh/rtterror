import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import {Close} from "@mui/icons-material";
import DialogContent from "@mui/material/DialogContent";
import {Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import DurationPrice from "../service/durationPrice";
import AddIcon from "@mui/icons-material/Add";
import styled from "../../styles/service.module.css";
import ServiceEmployeeTable from "../service/serviceEmployeeTable";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import * as React from "react";

const NewEmployeeDialog = (props)=>{
    const {open , handleClose} =props;
    return (
        <div>
            <Dialog open={open} fullWidth={true} maxWidth="lg" scroll="body">
                <DialogTitle>
                    New Service
                    {/*<IconButton*/}
                    {/*    aria-label="close"*/}
                    {/*    onClick={closeDialog}*/}
                    {/*    size="medium"*/}
                    {/*    sx={{*/}
                    {/*        position: 'absolute',*/}
                    {/*        right: 10,*/}
                    {/*        top: 10,*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <Close />*/}
                    {/*</IconButton>*/}
                </DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        direction="column"
                        alignItems="stretch"
                    >
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="description"
                                label="Description"
                                // onChange={(event) => handleSetValue(event)}
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