// import * as React from "react";
// import {useState} from "react";
// import {Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
// import styled from "../../styles/service.module.css";
// import Paper from "@mui/material/Paper";
//
// const ServiceEmployee = (props) => {
//     const { mode, item, employeeCheckList ,setEmployeeCheckList } = props;
//
//     const [employeeList,setEmployeeList] = useState([]);
//
//     console.log(employeeCheckList);
//     const handleCheck =(e)=>{
//         if(e.target.checked){
//             setEmployeeCheckList([...employeeCheckList,e.target.value]);
//         }
//         else{
//             setEmployeeCheckList(employeeCheckList.filter((name)=>e.target.value!=name));
//         }
//     }
//
//     return (
//         <div>
//             <TableContainer component={Paper}>
//                 <Table sx={{minWidth: 650}} aria-label="simple table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell align="center"><h1>Employee name</h1></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {elist.map((ename) => (
//                             <TableRow
//                                 key={ename}
//                                 sx={{'&:last-child td, &:last-child th': {border: 0}}}
//                             >
//                                 <TableCell component="th" scope="row" align="center">
//                                     <div className={styled.employeeRowDiv}>
//                                     {ename}
//                                     <Checkbox
//                                         key={ename}
//                                         aria-label={ename}
//                                         value={ename}
//                                         checked={employeeCheckList?employeeCheckList.includes(ename):false}
//                                         onChange={(event)=>{handleCheck(event)}}
//                                     />
//                                     </div>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
// };
// export default ServiceEmployee;
