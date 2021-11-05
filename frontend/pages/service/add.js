import AddServiceForm from "../../components/service/addServiceForm";
import {useRouter} from "next/router";
import request from "superagent";
import BuildPath from "../../components/pathBuilder";
import {useState} from "react";

export async function getServerSideProps() {
    const employeeList = ['E1','E2','E3','E4','E5','E6','E7','E8']
    return {
        props: { employeeList : employeeList },
    };
}

function ServiceFormPage({employeeList}){
    const router = useRouter();
    const [open, setOpen] = useState(true);

    const closeDialog=()=>{
        router.push("/service").then(r => console.log('then of push'+r));
        setOpen(false);
    }
    const addHandle=(data)=>{
        request
            .post(BuildPath("services"))
            .send(data)
            .set("Accept", "application/json")
            .then((res) => {
                console.log(res.status);
            })
            .catch((err) => {
                console.log(err);
            });
        closeDialog();
    }
    return (
        <>
            <AddServiceForm addHandle={addHandle} employeeList={employeeList} closeDialog={closeDialog} open={open} />
        </>
    )

}
export default ServiceFormPage;
