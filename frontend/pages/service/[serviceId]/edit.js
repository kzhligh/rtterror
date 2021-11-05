import EditServiceForm from "../../../components/service/editServiceForm";
import {useRouter} from "next/router";
import request from "superagent";
import BuildPath from "../../../components/pathBuilder";
import {useState} from "react";

export async function getServerSideProps(context) {
    const id = context.params.serviceId;
    let serviceItem ={};
    await request
        .get(BuildPath("services/"+id))
        .set("Accept", "application/json")
        .then((res) => {
            serviceItem=res.body;
        })
        .catch((err) => {
            console.log(err);
        });
    return {
        props: { serviceItem: serviceItem  },
    };
}

function ServiceEditFormPage(props){
    const router = useRouter();
    const {serviceItem} = props;
    const [open, setOpen] = useState(true);
    const employeeList = ['E1','E2','E3','E4','E5','E6','E7','E8']
    const editHandle=(data)=>{
        closeDialog();
    }
    const closeDialog=()=>{
        router.push("/service/"+serviceItem.id+"/details").then(r => console.log('then of push'+r));
        setOpen(false);
    }
    return (
        <>
            <EditServiceForm editHandle={editHandle} serviceItem={serviceItem} closeDialog={closeDialog} employeeList={employeeList} open={open}/>
        </>
    )
}
export default ServiceEditFormPage;