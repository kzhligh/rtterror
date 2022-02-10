import AddServiceForm from '../../components/service/addServiceForm';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { http } from "../../utils/http";

const apiPath = '/api/v1';

export async function getServerSideProps() {
    let employeeList = await http(`${apiPath}/employees`);
    return {
        props: { employeeList: employeeList },
    };
}

function ServiceFormPage({ employeeList }) {
    const router = useRouter();
    const [open, setOpen] = useState(true);

    const closeDialog = () => {
        router.push('/service').then((r) => console.log('then of push' + r));
        setOpen(false);
    };
    const addHandle = async (data) => {
        await http(`${apiPath}/services`, {
            method: 'POST',
            body: data,
        });
        closeDialog();
    };
    return (
        <AddServiceForm
            addHandle={addHandle}
            employeeList={employeeList}
            closeDialog={closeDialog}
            open={open}
        />
    );
}

export default ServiceFormPage;
