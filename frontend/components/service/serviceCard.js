import * as React from "react";
import IconButton from "@mui/material/IconButton";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Close } from "@mui/icons-material";

function CloseIcon() {
  return null;
}

const ServiceCard = (props) => {
  const { closeServiceCard, open, item } = props;
  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={open}
      // onClose={closeServiceCard}
    >
      <DialogTitle>
        Service Detail
        <IconButton
          aria-label="close"
          onClick={closeServiceCard}
          size="medium"
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{item["serviceId"]}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
export default ServiceCard;
