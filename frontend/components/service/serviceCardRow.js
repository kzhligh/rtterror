import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "../../styles/service.module.css";
import { useState } from "react";
import { CardActionArea, CardActions, CardHeader } from "@mui/material";
import {useRouter} from "next/router";

const ServiceCardRow = (props) => {
    const router = useRouter();
  const { item } = props;
  const toggleBlocked = (id) => {
    alert("service id  " + id);
  };

  const isBlock = () => item["status"] == "blocked";
  return (
    <div className={styled.flexAlignContainer}>
      <Card
        className={styled.cardWrapper}
        onClick={
          !isBlock()
            ? () => {
               console.log("card click");
                router.push('/service/' + item.serviceId+ '/details').then( r => console.log(r))
              }
            : undefined
        }
        style={{ backgroundColor: isBlock() ? "gray" : "white" }}
      >
        <CardHeader sx={{ fontSize: 30 }} title={item["name"]} />
        <CardContent>
          <Typography sx={{ fontSize: 24 }} color="text.secondary">
            Service Code: {item["code"]}
          </Typography>
          <Typography sx={{ fontSize: 24 }} color="text.secondary">
            Description : {item["description"]}
          </Typography>
        </CardContent>
        <div className={styled.separateVDiv} />
        <CardActionArea>
          <div className={styled.dateContainer}>
            <Typography sx={{ fontSize: 20 }}>
              Created On {item["dateCreated"]}
            </Typography>
          </div>
        </CardActionArea>
      </Card>
      <Button
        className={styled.buttonContainer}
        variant={isBlock() ? "contained" : "outlined"}
        onClick={() => toggleBlocked(item["serviceId"])}
        style={{ backgroundColor: isBlock() ? "gray" : "white" }}
      >
        {isBlock() ? "unblocked" : "blocked"}
      </Button>
    </div>
  );
};
export default ServiceCardRow;
