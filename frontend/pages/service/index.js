import ServiceComponent from '../../components/service';
import {useEffect, useState} from 'react';
import {http} from "../../utils/http";
import groupService from "../../utils/groupService";

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
            }).then();
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
