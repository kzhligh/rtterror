import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import {
  CardActionArea,
  CardHeader,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import styled from '../../styles/service.module.css';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';
import ServiceEmployeeTable from "./serviceEmployeeTable";
import SearchInput from "./search";

const ServiceDetailsCard = (props) => {
  const { closeServiceCard, item, employeeList } = props;
  const [employeeCheckList, setEmployeeCheckList] = useState([]);
  const [serviceEmployeeDialog, setServiceEmployeeDialog] = useState(false);
  const [remainEmployeeList, setRemainEmployeeList] = useState([]);

  const router = useRouter();
  const handleCheck = (e) => {
    if (e.target.checked) {
      setEmployeeCheckList([...employeeCheckList, e.target.value]);
    } else {
      setEmployeeCheckList(
        employeeCheckList.filter((name) => e.target.value != name)
      );
    }
  };
  const handleEditClick = () => {
    router.push('/service/' + item.id).then((r) => console.log(r));
  };
  const handleAddEmployee = () => {
    //    extract the employ not in the service
    //    set the display service employee dialog
    setServiceEmployeeDialog(true);
    setRemainEmployeeList(employeeList);
  };

  return (
      <Box>
        <Card>

          <CardContent>
            search
            {/*<SearchInput handleSearch={} />*/}
            <div className={styled.separateVDiv}></div>
            <Divider />
            <div className={styled.flexAlignContainer}>
              <div>duration</div>
              <div>Employee table
                  <ServiceEmployeeTable />
              </div>
            </div>
          </CardContent>
          <CardActionArea>
            <Button
                className={styled.addRightButton}
                variant="outlined"
                onClick={() => alert('save')}
            >
              Save
            </Button>
          </CardActionArea>
        </Card>
      </Box>
  );
};
export default ServiceDetailsCard;
