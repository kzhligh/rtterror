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
import {useEffect, useState} from "react";

const ComboItem = (props)=>{
    const {item ,handleServiceCheck ,removeService } = props

    return (<Card>
        <div className={styled.flexAlignContainer}>
            <div>
                <Stack>
                    <h4>name</h4>
                    <h4>code</h4>
                </Stack>
            </div>
            <div>
                <Stack direction="row" spacing={2}>
                    <h4>duration price</h4>
                    <Close onClick={()=>removeService(item)}></Close>
                </Stack>
            </div>
        </div>
    </Card>)
}

const ComboForm =(props)=>{
    const {openDialog , handleCloseComboDialog, serviceCheckList , handleServiceCheck ,type} = props
    const [comboName, setComboName] = useState('');
    const [comboPrice, setComboPrice] = useState(0);
    const [comboDuration, setComboDuration] = useState(0);
    useEffect(()=>{
            let name = '';
            let price = 0;
            let duration = 0;
            for(let serviceItem of serviceCheckList){
                console.log(serviceItem)
                name += serviceItem.barcode + " + ";
                price +=serviceItem.price;
                duration +=serviceItem.duration;
            }
            setComboName(name.slice(0, -2)); // remove the last +
            setComboPrice(price);
            setComboDuration(duration);
    },[serviceCheckList]);

    const clearValue = ()=>{
        setComboPrice(0);
        setComboName('');
        setComboDuration(0);
    }
    const closeClearValue =()=>{
        clearValue();
        handleCloseComboDialog();
    }

    const handleSetValue = (e) => {
        let label = e.target.id;
        let value = e.target.value;
        switch (label) {
            case 'comboName':
                setComboName(value);
                break;
            case 'comboPrice':
                setComboPrice(value);
                break;
            case 'comboDuration':
                setComboDuration(value* 3600000);
                break;
        }
    };
    const removeService = (item)=>{
        handleServiceCheck(false,item)
        if(serviceCheckList.length ==1){ // the update of component is kind of late
            closeClearValue();
        }
    }
    // add new service to the combo, pass the display only the service not yet in the combo
    return (<div>
        <Dialog open={openDialog} fullWidth={true} maxWidth="lg" scroll="body">
            <DialogTitle>
                New Combo
                <IconButton
                    aria-label="close"
                    onClick={closeClearValue}
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
                        id="comboName"
                        value={comboName}
                        onChange={(event) => handleSetValue(event)}
                    />
                    {serviceCheckList && serviceCheckList.map((item) => (
                        <ComboItem key={item.id} item={item} handleServiceCheck={handleServiceCheck} removeService={removeService}/>
                    ))}
                    <div className={styled.flexAlignContainer}>
                        <label>Total Duration: </label>
                        <TextField
                            id="comboDuration"
                            label="comboDuration"
                            value={(comboDuration/ 3600000).toFixed(1)}
                            onChange={(event) => handleSetValue(event)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">H</InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div className={styled.flexAlignContainer}>
                        <label>Total Duration: </label>
                        <TextField
                            id="comboPrice"
                            label="comboPrice"
                            value={comboPrice}
                            onChange={(event) => handleSetValue(event)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">$</InputAdornment>
                                ),
                            }}
                        />
                        </div>
                </Stack>
            </DialogContent>
            <DialogActions>
                <div className={styled.flexSpaceBetween}>
                    <Button onClick={closeClearValue}>Create </Button>
                    <Button onClick={closeClearValue}>Cancel</Button>
                </div>
            </DialogActions>
        </Dialog>
    </div>);
}
export default ComboForm;