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
    setServiceItem({
            "serviceCode":"ACU",
            "name": "Acupuncture",
            "description": "A curative and preventive therapy, which can be used on its own or as a complement to conventional medicine ",
            "treatment_type": "Acupuncture",
            "duration":1800000,
            "price": 100,
            "barcode":"ACU 001",
            "sms_description": "Acupuncture"
          });
    // request
    //   .get(BuildPath('services/' + id))
    //   .set('Accept', 'application/json')
    //   .then((res) => {
    //     // setServiceItem(res.body);
    //     setServiceItem({
    //       "serviceCode":"ACU",
    //       "name": "Acupuncture",
    //       "description": "A curative and preventive therapy, which can be used on its own or as a complement to conventional medicine ",
    //       "treatment_type": "Acupuncture",
    //       "duration":1800000,
    //       "price": 100,
    //       "barcode":"ACU 001",
    //       "sms_description": "Acupuncture"
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
  return (
    <>
      <ServiceDetailsCard
        item={serviceItem}
        employeeList={employeeList}
        serviceEmployeeList={serviceEmployeeList}
      />
    </>
  );
}
export default DetailPage;
