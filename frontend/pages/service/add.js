import ServiceForm from "../../components/service/serviceForm";
import {useRouter} from "next/router";

function ServiceFormPage(){
    const router = useRouter();
    const closeAddDialog = ()=>{
        router.replace('/service').then(r => console.log(r));
    }
    const addHandle=(data)=>{
        closeAddDialog();
    }
    return (
        <>
            <ServiceForm addHandle={addHandle}/>
        </>
    )

}
export default ServiceFormPage;
