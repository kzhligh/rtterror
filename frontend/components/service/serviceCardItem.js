import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "../../styles/service.module.css";

const ServiceCardItem = (props) => {
  const { item } = props;
  const blocked = (id) => {
    alert("service id  " + id);
  };
  const displayDetail = (item) => {
    alert(item["serviceId"]);
  };
  return (
    <div className={styled.flexAlignContainer}>
      <Card
        className={styled.cardWrapper}
        onClick={() => {
          displayDetail(item);
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
        </CardContent>
        {/*<CardActions>*/}
        {/*    <Button size="small">Learn More</Button>*/}
        {/*</CardActions>*/}
      </Card>
      <Button
        className={styled.buttonContainer}
        variant={item["status"] == "blocked" ? "contained" : "outlined"}
        onClick={() => blocked(item["serviceId"])}
      >
        {item["status"]}
      </Button>
    </div>
  );
};
export default ServiceCardItem;
