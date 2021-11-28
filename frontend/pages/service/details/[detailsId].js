import ServiceDetailsCard from '../../../components/service/serviceDetailsCard';
import { useRouter } from 'next/router';
import request from 'superagent';
import BuildPath from '../../../components/pathBuilder';
import { useEffect, useState } from 'react';

function DetailPage() {
  const router = useRouter();
  const [serviceItem, setServiceItem] = useState({});

  const id = router.query.detailsId;

  const getServiceInfo = () => {
    request
      .get(BuildPath('services/' + id))
      .set('Accept', 'application/json')
      .then((res) => {
        setServiceItem(res.body);
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
  const employeeList = [
      {'id': 1 , 'firstname': 'Jessica','lastname':'Lee', 'primary':'General Practice'},
      {'id': 2 ,'firstname': 'Shanna','lastname':'Huang', 'primary':'Acupuncture'},
      {'id': 3 ,'firstname': 'Albert','lastname':'Sheng', 'primary':'General Practice'},
      {'id': 4 ,'firstname': 'Greg','lastname':'Allard', 'primary':'General Practice'},
      {'id': 5 ,'firstname': 'Alan','lastname':'Rod', 'primary':'General Practice'},
      {'id': 6 ,'firstname': 'Beatrice','lastname':'Beauchamp', 'primary':'General Practice'},
      {'id': 7 ,'firstname': 'Sydney','lastname':'Shi', 'primary':'General Practice'}
  ];
  const serviceEmployeeList = employeeList.slice(5);
    const editHandle= (data , id) => {
        request
            .put(BuildPath("services/" + id))
            .send(data)
            .set("Accept", "application/json")
            .then((res) => {
                console.log(res.status);
            })
            .catch((err) => {
                console.log(err);
            });
    }
  return (
    <>
      <ServiceDetailsCard
        item={serviceItem}
        employeeList={employeeList}
        serviceEmployeeList={serviceEmployeeList}
        editHandle={editHandle}
      />
    </>
  );
}
export default DetailPage;
