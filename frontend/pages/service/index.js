import ServiceComponent from '../../components/service';
import BuildPath from '../../components/pathBuilder';
import request from 'superagent';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  let serviceList = [];
  await request
    .get(BuildPath('services'))
    .set('Accept', 'application/json')
    .then((res) => {
      serviceList = res.body;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: { serviceList: serviceList },
  };
}

const Service = ({ serviceList }) => {
  // router.push('/?counter=10', '/about?counter=10', { shallow: true })
  const router = useRouter();
  const [serviceListData, setServiceListData] = useState(serviceList);
  const [refresh, setRefresh] = useState(false);
  const refreshData = () => {
    router.push(router.asPath).then((r) => console.log(r));
    router.reload();
  };
  const getServiceList = () => {
    request
      .get(BuildPath('services'))
      .set('Accept', 'application/json')
      .then((res) => {
        console.log(res.body);
        setServiceListData(res.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getServiceList();
  }, []);
  useEffect(() => {
    getServiceList();
  }, [refresh]);

  const deleteService = (item) => {
    request
      .delete(BuildPath('services/' + item.id))
      .set('Accept', 'application/json')
      .then((res) => {
        // console.log(res.status);
        setRefresh(!refresh);
        refreshData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toggleBlocked = (item) => {
    request
      .put(
        BuildPath('services/' + item.blocked ? 'unblock/' : 'block/' + item.id)
      )
      .set('Accept', 'application/json')
      .then((res) => {
        // console.log(res.status);
        setRefresh(!refresh);
        refreshData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Service</h1>
      {console.log(serviceListData)}
      <ServiceComponent
        serviceListData={serviceListData}
        toggleBlocked={toggleBlocked}
        deleteService={deleteService}
      />
    </div>
  );
};

export default Service;
