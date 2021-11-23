import ServiceComponent from '../../components/service';
import BuildPath from '../../components/pathBuilder';
import request from 'superagent';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  let serviceList = [];
  serviceList= [{"id": 2,
    "serviceCode":"x OST",
    "name": "OSTEOPATHY",
    "description": "b Osteopathy is a therapeutic method of a preventative and curative approach considering all factors surrounding the patient. ",
    "treatment_type": "OSTEOPATHY",
    "duration":3600000,
    "price": 150,
    "barcode":"OST 001",
    "sms_description": "OSTEOPATHY"
  },
    {
    "id": 1,
    "serviceCode":"z ACU",
    "name": "Acupuncture",
    "description": "A curative and preventive therapy, which can be used on its own or as a complement to conventional medicine ",
    "treatment_type": "Acupuncture",
    "duration":1800000,
    "price": 100,
    "barcode":"ACU 001",
    "sms_description": "c Acupuncture"
  },

    {
      "id": 3,
      "serviceCode":"a SWEM",
      "name": "SWEDISH MASSAGE",
      "description": "d The Swedish massage is a manual physical technique, which aims to relieve the musculature from its tensions and to improve the circulation of blood and nutrients throughout the body while obtaining a state of relaxation. ",
      "treatment_type": "SWEDISH MASSAGE",
      "duration":3600000,
      "price": 120,
      "barcode":"SWEM 001",
      "sms_description": "SWEDISH MASSAGE"
    },
    {
      "id": "ea5400b9-d8d6-4dfe-92d8-06362b2ce2ab",
      "name": "combo name",
      "serviceCode": "combo serviceCode",
      "total_duration": 1000000,
      "total_price": "100.00",
      "description": null,
      "barcode": null,
      "sms_description": null,
      "blocked": false,
      "createdAt": "2021-11-08T02:31:42.000Z",
      "updatedAt": "2021-11-08T02:31:42.000Z",
      "services": [
        {
          "id": "71634c5d-eb33-45c8-bb57-00c563cfb748",
          "serviceCode": "BBBB",
          "name": "service 002 name",
          "description": "service 002 description",
          "treatment_type": "treatement type of service 002",
          "duration": 2000000,
          "price": "200.00",
          "barcode": "002002002002",
          "sms_description": "the sms description of service 002",
          "blocked": false,
          "hidden": false,
          "createdAt": "2021-11-06T06:03:35.000Z",
          "updatedAt": "2021-11-06T06:03:35.000Z",
          "service_combo": {
            "createdAt": "2021-11-08T02:31:42.000Z",
            "updatedAt": "2021-11-08T02:31:42.000Z",
            "serviceId": "71634c5d-eb33-45c8-bb57-00c563cfb748",
            "comboId": "ea5400b9-d8d6-4dfe-92d8-06362b2ce2ab"
          }
        },
        {
          "id": "7e73c821-47b7-4533-a49b-93bef676b50d",
          "serviceCode": "AAAA",
          "name": "service 001 name",
          "description": "service 001 description",
          "treatment_type": "treatement type of service 001",
          "duration": 1000000,
          "price": "100.00",
          "barcode": "11111111111111111111111",
          "sms_description": "the sms description of service 001",
          "blocked": false,
          "hidden": false,
          "createdAt": "2021-11-06T06:04:09.000Z",
          "updatedAt": "2021-11-06T06:04:09.000Z",
          "service_combo": {
            "createdAt": "2021-11-08T02:31:42.000Z",
            "updatedAt": "2021-11-08T02:31:42.000Z",
            "serviceId": "7e73c821-47b7-4533-a49b-93bef676b50d",
            "comboId": "ea5400b9-d8d6-4dfe-92d8-06362b2ce2ab"
          }
        },
        {
          "id": "cef5f637-3cb9-4c7d-a99c-c5a461da8c29",
          "serviceCode": "CCCC",
          "name": "service 003 name",
          "description": "service 003 description",
          "treatment_type": "treatement type of service 003",
          "duration": 3000000,
          "price": "300.00",
          "barcode": "3333333333",
          "sms_description": "the sms description of service 003",
          "blocked": false,
          "hidden": false,
          "createdAt": "2021-11-06T06:04:31.000Z",
          "updatedAt": "2021-11-06T06:04:31.000Z",
          "service_combo": {
            "createdAt": "2021-11-08T02:31:42.000Z",
            "updatedAt": "2021-11-08T02:31:42.000Z",
            "serviceId": "cef5f637-3cb9-4c7d-a99c-c5a461da8c29",
            "comboId": "ea5400b9-d8d6-4dfe-92d8-06362b2ce2ab"
          }
        }
      ]
    }];
  // await request
  //   .get(BuildPath('services'))
  //   .set('Accept', 'application/json')
  //   .then((res) => {
      // serviceList = res.body;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
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
