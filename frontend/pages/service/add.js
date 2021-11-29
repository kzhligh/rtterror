import AddServiceForm from '../../components/service/addServiceForm';
import { useRouter } from 'next/router';
import request from 'superagent';
import BuildPath from '../../components/pathBuilder';
import { useState } from 'react';

export async function getServerSideProps() {
  const employeeList = [
    {'id': 1 , 'firstname': 'Jessica','lastname':'Lee', 'primary':'General Practice'},
    {'id': 2 ,'firstname': 'Shanna','lastname':'Huang', 'primary':'Acupuncture'},
    {'id': 3 ,'firstname': 'Albert','lastname':'Sheng', 'primary':'General Practice'},
    {'id': 4 ,'firstname': 'Greg','lastname':'Allard', 'primary':'General Practice'},
    {'id': 5 ,'firstname': 'Alan','lastname':'Rod', 'primary':'General Practice'},
    {'id': 6 ,'firstname': 'Beatrice','lastname':'Beauchamp', 'primary':'General Practice'},
    {'id': 7 ,'firstname': 'Sydney','lastname':'Shi', 'primary':'General Practice'}
  ];
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
    await request
      .post(BuildPath('services'))
      .send(data)
      .set('Accept', 'application/json')
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.log(err);
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
