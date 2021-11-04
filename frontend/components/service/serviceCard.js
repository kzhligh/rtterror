import * as React from "react";
import IconButton from "@mui/material/IconButton";
import {
    CardHeader, Checkbox,
    Dialog, DialogActions,
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
import {useState} from "react";
import Paper from "@mui/material/Paper";
import {useRouter} from "next/router";


const ServiceCard = (props) => {
  const { closeServiceCard, item } = props;
  const [employeeCheckList , setEmployeeCheckList] = useState([]);

  const router = useRouter();
    const handleCheck =(e)=>{
        if(e.target.checked){
            setEmployeeCheckList([...employeeCheckList,e.target.value]);
        }
        else{
            setEmployeeCheckList(employeeCheckList.filter((name)=>e.target.value!=name));
        }
    }
    const handleEditClick = ()=>{
        router.push('/service/' + item.serviceId + '/edit').then( r => console.log(r));
    }


  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={true}
      scroll="body"
    >
      <DialogTitle>
          <Button
              className={styled.addButton}
              variant="outlined"
              onClick={handleEditClick}
          >
              Edit Service
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
                                    <TableCell align="center"><h1>Employee name</h1></TableCell>
                                    <TableCell align="left"><h4>Tittle</h4></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {item.offerBy.map((ename) => (
                                    <TableRow
                                        key={ename}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            <div className={styled.employeeRowDiv}>
                                            <Checkbox
                                                key={ename}
                                                aria-label={ename}
                                                value={ename}
                                                checked={employeeCheckList.includes(ename)}
                                                onChange={(event) => {
                                                    handleCheck(event)
                                                }}
                                            />
                                                <h3>{ename}</h3>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left"><h4>Tittle</h4></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

            </Card>
        </DialogContent>
            <DialogActions>
                <Button
                    // className={styled.addRightButton}
                    variant="outlined"
                    onClick={() => console.log('press')}
                >
                    {/*the employee that not in the service employeeCheckList.filter((name)=>e.target.value!=name) */}
                    Add Employee
                </Button>
            </DialogActions>

    </Dialog>
  );
};
export default ServiceCard;
