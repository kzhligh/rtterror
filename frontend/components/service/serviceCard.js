import * as React from "react";
import IconButton from "@mui/material/IconButton";
import {
    CardHeader, Checkbox,
    Dialog,
    DialogContent,
    DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import {Close} from "@mui/icons-material";
import styled from "../../styles/service.module.css";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import ServiceEmployee from "./serviceEmployee";
import {useState} from "react";
import Paper from "@mui/material/Paper";
import ServiceForm from "./serviceForm";

function CloseIcon() {
  return null;
}

const ServiceCard = (props) => {
  const { closeServiceCard, open, item } = props;
  const [employeeCheckList , setEmployeeCheckList] = useState([]);
  const [viewMode ,setViewMode] = useState(true);
    const handleCheck =(e)=>{
        //check is to remove from the service ,
        if(e.target.checked){
            setEmployeeCheckList([...employeeCheckList,e.target.value]);
        }
        else{
            setEmployeeCheckList(employeeCheckList.filter((name)=>e.target.value!=name));
        }
    }

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={open}
      // onClose={closeServiceCard}
    >
      <DialogTitle>
          <Button
              className={styled.addButton}
              variant="outlined"
              onClick={() => setViewMode(false)}
          >
              Edit
          </Button>
          <div className={styled.separateVDiv}></div>
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
        {viewMode ?
        <DialogContent>
            <Card>
                <CardHeader sx={{fontSize: 30}} title={item["name"]}>
                </CardHeader>

                <CardContent>
                    <Typography sx={{fontSize: 24}} color="text.secondary">
                        Service Code:
                    </Typography>

                    <Typography sx={{fontSize: 24}} color="text.secondary">
                        Description : {item["description"]}
                    </Typography>
                </CardContent>
                <div className={styled.separateVDiv}/>
                <Box>
                    <h1>Employee</h1>
                    <Button
                        className={styled.addButton}
                        variant="outlined"
                        onClick={() => console.log(employeeCheckList)}
                    >
                        Remove
                    </Button>
                    {/*the existing employee in the service  item.offerby */}
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Employee name</TableCell>
                                    <TableCell align="left">Title</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {item.offerBy.map((ename) => (
                                    <TableRow
                                        key={ename}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Checkbox
                                                key={ename}
                                                aria-label={ename}
                                                value={ename}
                                                checked={employeeCheckList.includes(ename)}
                                                onChange={(event) => {
                                                    handleCheck(event)
                                                }}
                                            />
                                            {ename}
                                        </TableCell>
                                        <TableCell align="right">title</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button
                        className={styled.addButton}
                        variant="outlined"
                        onClick={() => console.log('press')}
                    >
                        {/*the employee that not in the service employeeCheckList.filter((name)=>e.target.value!=name) */}
                        Add Employee
                    </Button>
                </Box>
            </Card>
        </DialogContent>
        : <ServiceForm />}
    </Dialog>
  );
};
export default ServiceCard;
