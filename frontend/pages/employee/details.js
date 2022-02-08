import EmployeeDetailComponent from "../../components/employee/employeedetailcomponent";
import _groupBy from "lodash/groupBy";
import {http} from "../../utils/http";
import {useRouter} from 'next/router';
import groupService from "../../utils/groupService";

export async function getServerSideProps(context) {
    const employee = await http(`/api/v1/employees/${context.query.empid}`);
    const serviceListResponse = await http(`/api/v1/services`);
    const serviceArray = _groupBy(serviceListResponse, 'service_code')
    let serviceList = groupService(serviceArray);
    let serviceEmployeeCode = Object.keys(_groupBy(employee.services, 'service_code'));
    let serviceEmployeeList = serviceList.filter((itemService) => serviceEmployeeCode.includes(itemService.service_code))
    employee.services = serviceEmployeeList;
    return {
        props: {employee: employee, serviceList: serviceList},
    };
}

const EmployeeDetails = ({employee, serviceList}) => {
    const router = useRouter();
    const editEmployee = async (empData) => {
        await http('/api/v1/employees', {
            method: 'PUT',
            body: empData,
        });
        router.push('/employee');
    }
    return (
        <EmployeeDetailComponent employee={employee} editEmployee={editEmployee} serviceList={serviceList}/>
    );
}
export default EmployeeDetails;