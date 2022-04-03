import ServiceDetailsCard from '../../components/service/serviceDetailsCard';
import { useRouter } from 'next/router';
import { http } from "../../utils/http";
import _groupBy from "lodash/groupBy";
import _cloneDeep from "lodash/cloneDeep";

const apiPath = '/api/v1';

export async function getServerSideProps(context) {
    const employeeList = await http(`${apiPath}/employees`);
    const serviceItemResponse = await http(`${apiPath}/services/${context.query.servicecode}`);
    const serviceArray = _groupBy(serviceItemResponse, 'service_code');
    let serviceItem, durationPriceList, durationPriceItem;

    const MS_H_CONVERSION_RATE = 600000;
    for (const serviceCode in serviceArray) {
        serviceItem = _cloneDeep(serviceArray[serviceCode][0]);
        serviceItem.service_code = serviceCode;
        delete serviceItem.duration;
        delete serviceItem.price;
        delete serviceItem.id;
        delete serviceItem.updatedAt;
        durationPriceList = [];
        for (const insideItem of serviceArray[serviceCode]) {
            durationPriceItem = {};
            durationPriceItem.id = insideItem.id;
            durationPriceItem.duration = (insideItem.duration * 1 / MS_H_CONVERSION_RATE);
            durationPriceItem.price = insideItem.price;
            durationPriceList.push(durationPriceItem);
        }
        serviceItem.durations_prices = durationPriceList;
    }

    return {
        props: { employeeList: employeeList, serviceItem: serviceItem },
    };
}

function DetailPage({ employeeList, serviceItem }) {
    const router = useRouter();

    const editHandle = async (data) => {
        await http(`${apiPath}/services`, {
            method: 'PUT',
            body: data,
        });
        router.push('/service').then((r) => console.log('then of push' + r));
    };
    return (
        <>
            <ServiceDetailsCard
                item={serviceItem}
                employeeList={employeeList}
                serviceEmployeeList={serviceItem.employees}
                editHandle={editHandle}
            />
        </>
    );
}

export default DetailPage;
