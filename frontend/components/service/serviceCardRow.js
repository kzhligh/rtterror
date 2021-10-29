import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "../../styles/service.module.css";
import {useState} from "react";
import ServiceCard from "./serviceCard";
import {CardActionArea, CardActions, CardHeader} from "@mui/material";

const ServiceCardRow = (props) => {
  const { item } = props;
  const [serviceCard, setServiceCard] = useState(false );
  const toggleServiceCard =()=>{
      setServiceCard(!serviceCard);
  }
  const blocked = (id) => {
    alert("service id  " + id);
  };

  const isBlock = ()=>item["status"] == "blocked";

  return (
    <div className={styled.flexAlignContainer}>
      <Card
          // disabled={item["status"] == "blocked"}
        className={styled.cardWrapper}
        onClick={!isBlock()? () => {
            toggleServiceCard();
        }:undefined}
        style={{backgroundColor: isBlock() ? "gray": "white"}}
      >
          <CardHeader
              sx={{ fontSize: 30 }}
              title={item['name']}
          />
        <CardContent>
          <Typography sx={{ fontSize: 24 }} color="text.secondary" >
              Service Code: {item['code']}
          </Typography>
            <Typography sx={{ fontSize: 24 }} color="text.secondary" >
                Description : {item['description']}
            </Typography>
        </CardContent>
          <div className={styled.separateVDiv} />
          <CardActionArea >
              <div className={styled.dateContainer}>
                  <Typography sx={{ fontSize: 20 }} >
                      Created On {item['dateCreated']}
                  </Typography>
              </div>
          </CardActionArea>

      </Card>
      <Button
        className={styled.buttonContainer}
        variant={isBlock() ? "contained" : "outlined"}
        onClick={() => blocked(item["serviceId"])}
        style={{backgroundColor: isBlock() ? "gray": "white"}}
      >
        {isBlock()? "unblocked" : "blocked"}
      </Button>
        {serviceCard && <ServiceCard closeServiceCard={toggleServiceCard} open={serviceCard} item={item} />}
    </div>
  );
};
export default ServiceCardRow;
