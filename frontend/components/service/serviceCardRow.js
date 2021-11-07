import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from '../../styles/service.module.css';
import { CardActionArea, CardActions, CardHeader } from '@mui/material';
import { useRouter } from 'next/router';

const ServiceCardRow = (props) => {
  const router = useRouter();
  const { item, toggleBlocked, deleteService } = props;

  // const isBlock = () => item.blocked;
  const isBlock = () => false;
  return (
    <div className={styled.flexAlignContainer}>
      <Card
        className={styled.cardWrapper}
        onClick={
          !isBlock()
            ? () => {
                console.log(item.id);
                router
                  .push('/service/details/' + item.id)
                  .then((r) => console.log(r));
              }
            : undefined
        }
        style={{ backgroundColor: isBlock() ? 'gray' : 'white' }}
      >
        <CardHeader sx={{ fontSize: 30 }} title={item.name} />
        <CardContent>
          <Typography sx={{ fontSize: 24 }} color="text.secondary">
            Service Code: {item.barcode}
          </Typography>
          <Typography sx={{ fontSize: 24 }} color="text.secondary">
            Description : {item.description}
          </Typography>
        </CardContent>
        <div className={styled.separateVDiv} />
        <CardActionArea>
          <div className={styled.dateContainer}>
            <Typography sx={{ fontSize: 20 }}>Created On</Typography>
          </div>
        </CardActionArea>
      </Card>
      <div className={styled.flexVerticalDisplay}>
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
      </div>
    </div>
  );
};
export default ServiceCardRow;
