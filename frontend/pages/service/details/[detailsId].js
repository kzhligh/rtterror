import ServiceCard from '../../../components/service/serviceCard';
import { useRouter } from 'next/router';
import request from 'superagent';
import BuildPath from '../../../components/pathBuilder';
import { useEffect, useState } from 'react';

function DetailPage() {
  const router = useRouter();
  const [serviceItem, setServiceItem] = useState({});

  const id = router.query.detailsId;
  console.log(id);
  const getServiceInfo = () => {
    request
      .get(BuildPath('services/' + id))
      .set('Accept', 'application/json')
      .then((res) => {
        console.log(typeof res.body);
        setServiceItem(res.body);
        console.log(serviceItem);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getServiceInfo();
  }, []);
  useEffect(() => {}, [serviceItem]);

  const closeServiceCard = () => {
    router.push('/service').then((r) => console.log('then of push' + r));
  };
  const employeeList = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'];
  return (
    <>
      {console.log(serviceItem)}
      <ServiceCard
        item={serviceItem}
        closeServiceCard={closeServiceCard}
        employeeList={employeeList}
      />
    </>
  );
}
export default DetailPage;
