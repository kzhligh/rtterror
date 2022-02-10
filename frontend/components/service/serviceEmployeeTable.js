import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';

const ServiceEmployeeTable = (props) => {
    const { displayEmployeeList, handleEmployeeCheck, employeeCheckList } = props;

    return (
        <TableContainer component={Paper} elevation={0} sx={{ border: 1, marginTop: '15px', borderColor: '#A7A7A7' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <caption><Typography>Employee table</Typography></caption>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            First name
                        </TableCell>
                        <TableCell align="center">
                            Last name
                        </TableCell>
                        <TableCell align="center">
                            Primary
                        </TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayEmployeeList.map((employee) => (
                        <TableRow
                            key={employee.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{employee.first_name}</TableCell>
                            <TableCell align="center">{employee.last_name}</TableCell>
                            <TableCell align="center">{employee.title}</TableCell>
                            <TableCell align="right" size="small">
                                <Checkbox
                                    key={employee.id}
                                    // aria-label={ename}
                                    value={employee}
                                    checked={employeeCheckList.includes(employee)}
                                    onChange={(event) => {
                                        handleEmployeeCheck(event.target.checked, employee);
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default ServiceEmployeeTable;
