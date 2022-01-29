import ServiceDetailsCard from '../../components/service/serviceDetailsCard';
import { useRouter } from 'next/router';
import request from 'superagent';
import BuildPath from '../../components/pathBuilder';
import { useEffect, useState } from 'react';
import {http} from "../../utils/http";
import _groupBy from "lodash/groupBy";
import _cloneDeep from "lodash/cloneDeep";

export async function getServerSideProps(context) {
  console.log(context.query.servicecode);
  let employeeList= await http(`/api/v1/employees`);
  let serviceItemResponse= await http(`/api/v1/services/${context.query.servicecode}`);
  let serviceArray = _groupBy(serviceItemResponse, 'service_code');
  let serviceItem, durationPriceList, durationPriceItem;
  for (const serviceCode in serviceArray) {
    serviceItem = _cloneDeep(serviceArray[serviceCode][0]);
    serviceItem.service_code = serviceCode;
    delete serviceItem.duration;
    delete serviceItem.price;
    durationPriceList = [];
    for (let insideItem of serviceArray[serviceCode]) {
      durationPriceItem = {};
      durationPriceItem.id = insideItem.id;
      durationPriceItem.duration = (insideItem.duration * 1 / 3600000).toFixed(2);
      durationPriceItem.price = insideItem.price;
      durationPriceList.push(durationPriceItem);
    }
    serviceItem.durations_prices = durationPriceList;
  }
  // console.log(serviceList);
  // setServiceListData(serviceList);
  console.log(serviceItem);
  return {
    props: { employeeList: employeeList , serviceItem:serviceItem },
  };
}
function DetailPage({employeeList,serviceItem}) {
  const router = useRouter();

  const closeServiceCard = () => {
    router.push('/service').then((r) => console.log('then of push' + r));
  };
  const serviceEmployeeList = employeeList.slice(5);
  const editHandle = async (data) => {
    const remainingCustomers = await http('/api/v1/service', {
      method: 'PUT',
      body: data,
    });
    // request
    //     .put(BuildPath('services/' + id))
    //     .send(data)
    //     .set('Accept', 'application/json')
    //     .then((res) => {
    //       console.log(res.status);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  };
  return (
    <>
      <ServiceDetailsCard
        item={serviceItem}
        employeeList={employeeList}
        serviceEmployeeList={serviceItem.employees}
        editHandle={editHandle}
      />
    </>
  );
}
export default DetailPage;
