import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from '../../styles/service.module.css';
import {CardActionArea, CardActions, CardHeader, Checkbox, Stack} from '@mui/material';
import { useRouter } from 'next/router';
import {useState} from "react";
import ComboForm from "./comboForm";

const ServiceCardRow = (props) => {
  const router = useRouter();
  const { item, toggleBlocked, deleteService , serviceCheckList  , handleServiceCheck} = props;
  const [editComboDialog, setEditComboDialog] = useState(false);
  const isBlock = () => item.blocked;
  const isCombo = ()=> item.hasOwnProperty('services');
  const detailsPage =()=>{
    if(isCombo()){
      setEditComboDialog(true);
    }
    else{
      router
          .push('/service/details/' + item.id)
          .then((r) => console.log(r));
    }
  }
  const handleCloseEditDialog =()=>{
    setEditComboDialog(false);
  }
  const getCreateDate = (item) => {
    return new Date(item['createdAt']).toDateString();
  };
  return (
    <div className={styled.flexServiceCombo}>

      <Card
        className={styled.cardWrapper}
        onClick={
          !isBlock()
            ? () => {
                detailsPage();
              }
            : undefined
        }
        style={{ backgroundColor: isBlock() ? 'gray' : 'white' }}
      >
        <CardContent>

          <Typography sx={{ fontSize: 24 }} color="text.secondary">
            Service Code: {item.barcode}
          </Typography>
          <Typography sx={{ fontSize: 24 }} color="text.secondary">
            Duration: {(item.duration / 3600000).toFixed(1)} H
          </Typography>
          <Typography sx={{ fontSize: 24 }} color="text.secondary">
            Description : {item.description}
          </Typography>
          <Typography sx={{ fontSize: 24 }} color="text.secondary">
            {isCombo()?'Combo':''}
          </Typography>
        </CardContent>
        <div className={styled.separateVDiv} />
        <CardActionArea>
          <div className={styled.dateContainer}>
            <Typography sx={{ fontSize: 20 }}>
              Created On : {getCreateDate(item)}
            </Typography>
          </div>
        </CardActionArea>
      </Card>
      {!isCombo()?<Checkbox
          key={item.id}
          value={item}
          checked={
            serviceCheckList
                ? serviceCheckList.includes(item)
                : false
          }
          onChange={(event) => {
            handleServiceCheck(event.target.checked,item);
          }}
      />:null}
      <Stack spacing={2}>
        <Button
            className={styled.buttonContainer}
            variant={isBlock() ? 'contained' : 'outlined'}
            onClick={() => toggleBlocked(item)}
            style={{ backgroundColor: isBlock() ? 'gray' : 'white' }}
        >
          {isBlock() ? 'unblocked' : 'blocked'}
        </Button>
        <Button
            className={styled.buttonContainer}
            variant="outlined"
            onClick={() => deleteService(item)}
        >
          Delete
        </Button>
      </Stack>
      <ComboForm
          openDialog={editComboDialog}
          handleCloseComboDialog={handleCloseEditDialog}
          serviceCheckList={serviceCheckList}
          handleServiceCheck={handleServiceCheck}
          type={"edit"}
      >
      </ComboForm>
    </div>
  );
};
export default ServiceCardRow;
