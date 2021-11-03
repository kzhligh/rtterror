import AddServiceForm from "../../components/service/addServiceForm";
import {useRouter} from "next/router";

export async function getStaticProps() {
    var resstatus = "";
    const res = await fetch(
        "https://api.github.com/repos/visionmedia/superagent"
    );
    const employeeList = ['E1','E2','E3','E4','E5','E6','E7','E8']
    return {
        props: { employeeList : employeeList },
        revalidate: 10
    };
}

function ServiceFormPage({employeeList}){
    const router = useRouter();
    const closeAddDialog = ()=>{
        router.replace('/service').then(r => console.log(r));
    }
    const addHandle=(data)=>{
        closeAddDialog();
    }
    return (
        <>
            <AddServiceForm addHandle={addHandle} employeeList={employeeList} closeAddDialog={closeAddDialog} />
        </>
    )

}
export default ServiceFormPage;
