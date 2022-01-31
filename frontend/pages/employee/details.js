import EmployeeDetailComponent from "../../components/employee/details";
import _groupBy from "lodash/groupBy";
import _cloneDeep from "lodash/cloneDeep";
import {http} from "../../utils/http";
import {useRouter} from 'next/router';

export async function getServerSideProps(context) {
    const employee = await http(`/api/v1/employees/${context.query.empid}`);
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
        const result = await http('/api/v1/employees', {
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