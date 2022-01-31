import ServiceComponent from '../../components/service';
import {useEffect, useState} from 'react';
import {http} from "../../utils/http";
import _groupBy from "lodash/groupBy";
import _cloneDeep from "lodash/cloneDeep";

export async function getServerSideProps(context) {
    const employeeList = await http(`/api/v1/employees`);
    return {
        props: {employeeList: employeeList},
    };
}

const Service = ({employeeList}) => {
    const [serviceListData, setServiceListData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(undefined);
    const groupService = (serviceListResponse) => {
        const serviceArray = _groupBy(serviceListResponse, 'service_code')
        const serviceList = [];
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
        return serviceList;
    }

    const getServiceList = async () => {
        const serviceListResponse = await http(`/api/v1/services`);
        const comboList = await http(`/api/v1/combos`);
        for (const combo in comboList) {
            comboList[combo].total_duration = (comboList[combo].total_duration * 1 / 3600000).toFixed(2);
        }
        setServiceListData([...groupService(serviceListResponse), ...comboList]);


    };
    useEffect(() => {
        setLoading(true);
        getServiceList().then((r) => setLoading(false));
    }, [refresh]);
    useEffect(() => {
        setLoading(true);
        getServiceList().then((r) => setLoading(false));
    }, []);

    const deleteService = (item) => {
        if (item.hasOwnProperty('services')) {
            http(`/api/v1/combos/${item.id}`, {
                method: 'DELETE'
            }).then((r) => {
            });
            setRefresh(!refresh);
        } else {
            http(`/api/v1/services/${item.service_code}`, {
                method: 'DELETE'
            }).then((r) => {
                setRefresh(!refresh)
            });
        }
    };
    const toggleBlocked = (item) => {
        if (item.hasOwnProperty('services')) {
            const action = item.blocked ? 'unblock' : 'block';
            http(`/api/v1/combos/${item.id}/${action}`, {
                method: 'PUT'
            }).then((r) => {
                setRefresh(!refresh)
            });
        } else {
            const path = '/api/v1/services/' + item.service_code + (item.blocked ? '/unblock' : '/block');
            http(path, {
                method: 'PUT'
            }).then((r) => {
                setRefresh(!refresh)
            });
        }
    };
    return (
        <div>
            <h1>Service</h1>
            {!loading && (
                <ServiceComponent
                    serviceListData={serviceListData}
                    toggleBlocked={toggleBlocked}
                    deleteService={deleteService}
                    setRefresh={setRefresh}
                    refresh={refresh}
                />
            )}
        </div>
    );
};

export default Service;
