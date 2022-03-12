import * as React from 'react';
import { Card, Slider, Input, InputLabel, Grid, Box } from '@mui/material';
import { Close } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material';

const ClassicSlider = styled(Slider)(({ theme }) => ({
    color: "#707070",
}));

const DurationPriceItem = (props) => {
    const {
        index,
        item,
        amILast,
        handleRemoveDurationPrice,
        reload,
        setReload,
    } = props;
    const handleOnChange = (type, value) => {
        switch (type) {
            case 'duration':
                item.duration = value * 1;
                break;
            case 'price':
                item.price = value * 1;
                break;
        }
        setReload(!reload);
    };
    const MAX_DURATION = 300;
    const DURATION_STEP = 15;
    const marks = Array(5).fill().map((_, i) => ({ value: (i + 1) * 60 }));
    return (
        <Card sx={{ borderRadius: 0, boxShadow: 0 }}>
            <IconButton
                aria-label="close"
                onClick={() => handleRemoveDurationPrice(index)}
                size="small"
            >
                {amILast || <Close />}
            </IconButton>
            <Box padding="0 50px">
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={6}>
                        <ClassicSlider
                            onChange={(_event, value) => handleOnChange('duration', value)}
                            aria-label="Always visible"
                            value={item.duration}
                            min={0}
                            max={MAX_DURATION}
                            step={DURATION_STEP}
                            marks={marks}
                            valueLabelDisplay="on"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <InputLabel htmlFor={`hrs-for-${index}`}>min</InputLabel>
                        <Input
                            id={`hrs-for-${index}`}
                            value={item.duration}
                            size="small"
                            onChange={(event) => handleOnChange('duration', event.target.value)}
                            inputProps={{
                                min: 0,
                                max: MAX_DURATION,
                                step: DURATION_STEP,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <InputLabel htmlFor={`price-for-${index}`}>dollar</InputLabel>
                        <Input
                            id={`price-for-${index}`}
                            size="small"
                            value={item.price}
                            onChange={(event) => handleOnChange('price', isNaN(event.target.value) ? 0 : parseInt(event.target.value))}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
};
export default DurationPriceItem;
