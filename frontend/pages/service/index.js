import ServiceComponent from '/components/service';
import { useEffect, useState } from 'react';
import { http } from '/utils/http';
import { Typography } from '@mui/material';
import groupService from '/utils/groupService';
const apiPath = '/api/v1';

export async function getServerSideProps(_context) {
    return {
        props: {},
    };
}

const Service = ({ }) => {
    const [serviceListData, setServiceListData] = useState([]);
    const [comboListData, setComboListData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(undefined);

    const MS_H_CONVERSION_RATE = 600000;
    const getServiceList = async () => {
        const serviceListResponse = await http(`${apiPath}/services`);
        const comboList = await http(`${apiPath}/combos`);
        for (const combo in comboList) {
            comboList[combo].total_duration =
                (comboList[combo].total_duration * 1) / MS_H_CONVERSION_RATE;
        }
        const serviceList = groupService(serviceListResponse);
        serviceList.sort((a, b) => (+a.blocked < +b.blocked ? -1 : 1));
        comboList.sort((a, b) => (+a.blocked < +b.blocked ? -1 : 1));
        setServiceListData(serviceList);
        setComboListData(comboList);
    };
    useEffect(() => {
        setLoading(true);
        getServiceList().then((_r) => setLoading(false));
    }, [refresh]);
    useEffect(() => {
        setLoading(true);
        getServiceList().then((_r) => setLoading(false));
    }, []);

    const deleteService = (item) => {
        if (item.hasOwnProperty('services')) {
            http(`${apiPath}/combos/${item.id}`, {
                method: 'DELETE',
            }).then();
            setRefresh(!refresh);
        } else {
            http(`${apiPath}/services/${item.service_code}`, {
                method: 'DELETE',
            }).then((_r) => {
                setRefresh(!refresh);
            });
        }
    };
    const toggleBlocked = (item) => {
        if (item.hasOwnProperty('services')) {
            http(
                `${apiPath}/combos/${item.id}/${item.blocked ? 'unblock' : 'block'}`,
                { method: 'PUT' }
            ).then((_r) => {
                setRefresh(!refresh);
            });
        } else {
            http(
                `${apiPath}/services/${item.service_code}/${item.blocked ? 'unblock' : 'block'
                }`,
                { method: 'PUT' }
            ).then((_r) => {
                setRefresh(!refresh);
            });
        }
    };
    return (
        <div>
            <Typography variant='h6'>Service</Typography>
            {!loading && (
                <ServiceComponent
                    comboList={comboListData}
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
