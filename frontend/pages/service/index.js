import ServiceComponent from "../../components/service";
import BuildPath from "../../components/pathBuilder";
import request from 'superagent';
import {useEffect, useState} from "react";

export async function getServerSideProps() {
    let serviceListData =[];
    await request
        .get(BuildPath("services"))
        .set("Accept", "application/json")
        .then((res) => {
            serviceListData=res.body;
        })
        .catch((err) => {
            console.log(err);
        });
    return {
        props: { serviceListData: serviceListData }
    };
}

function Service(props) {
  const { serviceListData } = props;
  const [serviceList, setServiceList] =useState(serviceListData);
  const [reload, setReload]= useState(false);
    useEffect(async () => {
        await request
            .get(BuildPath("services"))
            .set("Accept", "application/json")
            .then((res) => {
                setServiceList(res.body);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [reload]);

    const deleteService = async (item)=>{
        await request
            .delete(BuildPath("services/"+ item.id))
            .set("Accept", "application/json")
            .then(async (res) => {
               setReload(!reload);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const toggleBlocked=async (item) => {
        console.log(item.blocked);
      await request
          .put(BuildPath("services/"+item.blocked?'unblock/':'block/'+item.id))
          .set("Accept", "application/json")
          .then(async (res) => {
              // now return only 1
              setReload(!reload);
          })
          .catch((err) => {
              console.log(err);
          });
  }
  return (
    <div>
      <h1>Service</h1>
      <ServiceComponent serviceListData={serviceListData} toggleBlocked={toggleBlocked} deleteService={deleteService}/>
    </div>
  );
}



export default Service;
