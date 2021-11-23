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
  const employeeList = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'];
  return (
    <>
      <ServiceDetailsCard
        item={serviceItem}
        closeServiceCard={closeServiceCard}
        employeeList={employeeList}
      />
    </>
  );
}
export default DetailPage;
