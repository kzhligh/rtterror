import Card from '@mui/material/Card';
import {InputAdornment, Slider} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import {Close} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const DurationPrice = (props) => {
    const {
        index,
        item,
        durationPriceList,
        handleRemoveDurationPrice,
        reload,
        setReload,
    } = props;
    const handleOnChange = (type, value) => {
        switch (type) {
            case 'duration':
                durationPriceList[index].duration = value;
                break;
            case 'price':
                durationPriceList[index].price = value;
                break;
        }
        setReload(!reload);
    };
    return (
        <Card raised={true}>
            {index > 0 ? (
                <IconButton
                    aria-label="close"
                    onClick={() => handleRemoveDurationPrice(index)}
                    size="medium"
                >
                    <Close/>
                </IconButton>
            ) : null}
            <Box sx={{width: 500}} padding="50px 50px">
                <Slider
                    onChange={(event, value) => handleOnChange('duration', value)}
                    aria-label="Always visible"
                    value={durationPriceList[index].duration}
                    min={0.5}
                    step={0.5}
                    max={2}
                    valueLabelDisplay="on"
                />
                <TextField
                    margin="normal"
                    id="price"
                    label="price"
                    type="number"
                    value={durationPriceList[index].price}
                    required
                    onChange={(event) => handleOnChange('price', event.target.value)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />
            </Box>
        </Card>
    );
};
export default DurationPrice;
