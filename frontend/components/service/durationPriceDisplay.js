import * as React from 'react';
import { useState } from 'react';
import DurationPriceItem from './durationPriceItem';
import { Button, Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { styled } from '@mui/material/styles';

const ClassicButton = styled(Button)(({ theme }) => ({
    border: '1px solid',
    borderColor: "#BBBBBB",
    backgroundColor: "#EFEFEF",
    color: "#707070",

    '&:hover': {
        color: "#707070",
        backgroundColor: "white",
    },
}));


const DurationPriceDisplay = (props) => {

    const { durationPriceList, setDurationPriceList, reload, setReload } = props;
    const [isEditingDurationPrice, setIsEditingDurationPrice] = useState(false);

    const handleAddDurationPrice = () => {
        setDurationPriceList([...durationPriceList, { price: 50, duration: 0 }]);
    };
    const handleRemoveDurationPrice = (index) => {
        setDurationPriceList([
            ...durationPriceList.slice(0, index),
            ...durationPriceList.slice(index + 1),
        ]);
    };

    if (isEditingDurationPrice) {
        return <>
            <Grid container direction="row">
                <Grid xs={6}>
                    <Button onClick={handleAddDurationPrice} color="info" variant="contained" fullWidth>
                        <Typography variant="button">Add A New Option</Typography>
                    </Button>
                </Grid>
                <Grid xs={6}>
                    <Button onClick={() => { setIsEditingDurationPrice(false); }} color="success" variant="contained" fullWidth>
                        <Typography variant="button">Done</Typography>
                    </Button>
                </Grid>
            </Grid>
            {durationPriceList.map((item, index) =>
                <DurationPriceItem
                    key={index}
                    index={index}
                    item={item}
                    amILast={durationPriceList.length === 1}
                    handleRemoveDurationPrice={handleRemoveDurationPrice}
                    reload={reload}
                    setReload={setReload}
                />
            )}
        </>;
    }

    return <Grid container direction="column" style={{ height: "100%" }}>
        <Grid>
            <ClassicButton onClick={() => { setIsEditingDurationPrice(true); }} variant="contained" fullWidth>
                <Typography variant="button">Modify Options</Typography>
            </ClassicButton>
        </Grid>
        <DataGrid
            columns={[
                { field: 'duration', headerName: 'Duration (min)', type: 'number', flex: 1 },
                { field: 'price', headerName: 'Price (CAD)', type: 'number', flex: 1 }]}
            rows={
                durationPriceList.map((element, index) => ({ id: index + 1, duration: element.duration, price: element.price }))
            }
        />
    </Grid>;

};

export default DurationPriceDisplay;