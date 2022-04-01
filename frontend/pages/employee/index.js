import EmployeeComponent from "../../components/employee";
import {useState} from "react";
import {http} from "../../utils/http";
import groupService from "../../utils/groupService";

export async function getServerSideProps(context) {
    const employeeList = await http(`/api/v1/employees`);
    const serviceListResponse = await http(`/api/v1/services`);
    const serviceList = groupService(serviceListResponse);
    return {
        props: {serviceList: serviceList, employeesList: employeeList},
    };
}

const Employee = ({serviceList, employeesList}) => {
    const [employeeList, setEmployeeList] = useState(employeesList);

    const addEmployee = async (empData) => {
        const result = await http('/api/v1/employees', {
            method: 'POST',
            body: empData,
        });
        setEmployeeList([...employeeList, result]);
    }

    const deleteEmployee = async (ids) => {
        const result = await http(`/api/v1/employees/multiple`, {
            method: 'DELETE',
            body: {ids:ids}
        });
        setEmployeeList(result);
    }
    return (
        <div>
            <EmployeeComponent
                employeeList={employeeList}
                serviceList={serviceList}
                addEmployee={addEmployee}
                deleteEmployee={deleteEmployee}
            />
        </div>
    );
}
export default Employee;