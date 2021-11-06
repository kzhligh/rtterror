import ServiceCard from "../../../components/service/serviceCard";
import {useRouter} from "next/router";
import request from "superagent";
import BuildPath from "../../../components/pathBuilder";
import {useState} from "react";

//
// export async function getServerSideProps(context) {
//     const router = useRouter();
//     const id = router.query.serviceId;
//     console.log(id)
//     let serviceItem ={};
//     await request
//         .get(BuildPath("services/"+id))
//         .set("Accept", "application/json")
//         .then((res) => {
//             serviceItem=res.body;
//         })
//         .catch((err) => {
//             console.log(err);
//         });
//     return {
//         props: { serviceItem: serviceItem }, // will be passed to the page component as props
//     };
// }
function DetailPage(){
    const router = useRouter();
    const [serviceItem , setServiceItem] = useState({});

    const id = router.query.detailsId;
    const getServiceInfo = ()=>{
        request
            .get(BuildPath("services/"+id))
            .set("Accept", "application/json")
            .then((res) => {
                setServiceItem(res.body);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const closeServiceCard=()=>{
        router.push('/service').then(r => console.log('then of push'+r));
    };
    const employeeList = ['E1','E2','E3','E4','E5','E6','E7','E8']
    return (
        <>
            <ServiceCard item={serviceItem} closeServiceCard={closeServiceCard} employeeList={employeeList}/>
        </>
    )

}
export default DetailPage;