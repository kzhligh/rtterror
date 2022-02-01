import EmployeeComponent from "../../components/employee";
import groupService from "../../utils/groupService";
import {useState} from "react";
import _groupBy from "lodash/groupBy";
import _cloneDeep from "lodash/cloneDeep";
import {http} from "../../utils/http";

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

    const deleteEmployee = async (id) => {
        const result = await http(`/api/v1/employees/${id}`, {
            method: 'DELETE'
        });
        setEmployeeList(result);
    }
    return (
        <div>
            <h1></h1>

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