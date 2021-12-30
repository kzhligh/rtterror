import ServiceComponent from '../../components/service';
import BuildPath from '../../components/pathBuilder';
import request from 'superagent';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  let serviceList = [
    {
      "serviceCode":"ACU",
      "name": "Acupuncture",
      "description": "A curative and preventive therapy, which can be used on its own or as a complement to conventional medicine ",
      "treatment_type": "Acupuncture",
      "duration":1800000,
      "price": 100,
      "barcode":"ACU 001",
      "sms_description": "Acupuncture"
    }
,
    {
      "serviceCode":"OST",
      "name": "OSTEOPATHY",
      "description": "Osteopathy is a therapeutic method of a preventative and curative approach considering all factors surrounding the patient. ",
      "treatment_type": "OSTEOPATHY",
      "duration":3600000,
      "price": 150,
      "barcode":"OST 001",
      "sms_description": "OSTEOPATHY"
    }
,
    {
      "serviceCode":"SWEM",
      "name": "SWEDISH MASSAGE",
      "description": "The Swedish massage is a manual physical technique, which aims to relieve the musculature from its tensions and to improve the circulation of blood and nutrients throughout the body while obtaining a state of relaxation. ",
      "treatment_type": "SWEDISH MASSAGE",
      "duration":3600000,
      "price": 120,
      "barcode":"SWEM 001",
      "sms_description": "SWEDISH MASSAGE"
    }

,
    {
      "serviceCode":"SWEM",
      "name": "SWEDISH MASSAGE",
      "description": "The Swedish massage is a manual physical technique, which aims to relieve the musculature from its tensions and to improve the circulation of blood and nutrients throughout the body while obtaining a state of relaxation. ",
      "treatment_type": "SWEDISH MASSAGE",
      "duration":3600000,
      "price": 120,
      "barcode":"SWEM 001",
      "sms_description": "SWEDISH MASSAGE"
    }
  ];
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
  const [serviceListData, setServiceListData] = useState(serviceList);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(undefined);

  const getServiceList = async () => {
    await request
      .get(BuildPath('services'))
      .set('Accept', 'application/json')
      .then((res) => {
        let serList = res.body;
        serList.sort((item1, item2) => {
          const date1 = new Date(item1['createdAt']);
          const date2 = new Date(item2['createdAt']);

          if (date1 > date2) {
            return -1;
          } else if (date1 < date2) {
            return 1;
          } else {
            return 0;
          }
        });
        setServiceListData(serList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    getServiceList().then((r) => setLoading(false));
  }, [refresh]);

  const deleteService = (item) => {
    request
      .delete(BuildPath('services/' + item.id))
      .set('Accept', 'application/json')
      .then((res) => {
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toggleBlocked = (item) => {
    let path = 'services/' + (item.blocked ? 'unblock/' : 'block/') + item.id;

    request
      .put(BuildPath(path))
      .set('Accept', 'application/json')
      .then((res) => {
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Service</h1>
      {!loading && (
        <ServiceComponent
          serviceListData={serviceListData}
          toggleBlocked={toggleBlocked}
          deleteService={deleteService}
        />
      )}
    </div>
  );
};

export default Service;
