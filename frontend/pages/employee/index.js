import EmployeeComponent from "../../components/employee";

import {useState} from "react";
import _groupBy from "lodash/groupBy";
import _cloneDeep from "lodash/cloneDeep";
import {http} from "../../utils/http";

export async function getServerSideProps(context) {
    const employeeList = await http(`/api/v1/employees`);
    const serviceListResponse = await http(`/api/v1/services`);
    const serviceArray = _groupBy(serviceListResponse, 'service_code')
    let serviceList = [];
    let item, durationPriceList, durationPriceItem;
    for (const serviceCode in serviceArray) {
        item = _cloneDeep(serviceArray[serviceCode][0]);
        item.service_code = serviceCode;
        delete item.duration;
        delete item.price;
        durationPriceList = [];
        for (let insideItem of serviceArray[serviceCode]) {
            durationPriceItem = {};
            durationPriceItem.id = insideItem.id;
            durationPriceItem.duration = (insideItem.duration * 1 / 3600000).toFixed(2);
            durationPriceItem.price = insideItem.price;
            durationPriceList.push(durationPriceItem);
        }
        item.durations_prices = durationPriceList;
        serviceList.push(item);
    }
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