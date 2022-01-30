import AddServiceForm from '../../components/service/addServiceForm';
import {useRouter} from 'next/router';
import {useState} from 'react';
import {http} from "../../utils/http";

export async function getServerSideProps() {
    let employeeList = await http(`/api/v1/employees`);
    return {
        props: {employeeList: employeeList},
    };
}

function ServiceFormPage({employeeList}) {
    const router = useRouter();
    const [open, setOpen] = useState(true);

    const closeDialog = () => {
        router.push('/service').then((r) => console.log('then of push' + r));
        setOpen(false);
    };
    const addHandle = async (data) => {
        const result = await http('/api/v1/services', {
            method: 'POST',
            body: data,
        });
        closeDialog();
    };
    return (
        <>
            <AddServiceForm
                addHandle={addHandle}
                employeeList={employeeList}
                closeDialog={closeDialog}
                open={open}
            />
        </>
    );
}

export default ServiceFormPage;
