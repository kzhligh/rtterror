import * as React from 'react';
import {
    Card,
    CardHeader, Checkbox,
    Chip, FormControl,
    FormControlLabel,
    FormLabel, IconButton, Radio,
    RadioGroup
} from '@mui/material';
import { Close } from '@mui/icons-material';
import _isEmpty from 'lodash/isEmpty';

export const ComboItem = (props) => {
    const {
        item: serviceItem, handleServiceCheck, removeService, isEdit, serviceCheckList, changeDurationOfService,
    } = props;

    return (
        <Card>
            <CardHeader
                action={<>
                    {isEdit ? (
                        <Checkbox
                            key={serviceItem.id}
                            value={serviceItem}
                            checked={serviceCheckList.includes(serviceItem)}
                            onChange={(event) => {
                                handleServiceCheck(event.target.checked, serviceItem);
                            }} />
                    ) : (
                        <IconButton onClick={() => removeService(serviceItem)}>
                            <Close />
                        </IconButton>
                    )}
                </>}
                title={<>{serviceItem.name}</>}
                subheader={<>
                    <Chip label='Service Code' size='small' />{' '}
                    {serviceItem.service_code.split('-', 1)[0]}
                </>} />
            <FormControl
                sx={{
                    marginX: '10px',
                }}
            >
                <FormLabel id='demo-row-radio-buttons-group-label'>Options</FormLabel>
                <RadioGroup
                    row
                    data-cy='clientSort'
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                    value={0}
                >
                    {!_isEmpty(serviceItem.durations_prices)
                        ? serviceItem.durations_prices.map((option, index) => (
                            <FormControlLabel
                                value={index}
                                key={index}
                                control={<Radio />}
                                onClick={() => changeDurationOfService(
                                    serviceItem.service_code,
                                    option,
                                    serviceCheckList
                                )}
                                label={`${option.duration} MIN / ${option.price} CAD`} />
                        ))
                        : null}
                </RadioGroup>
            </FormControl>
        </Card>
    );
};
