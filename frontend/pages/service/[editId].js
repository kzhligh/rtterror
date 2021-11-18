import EditServiceForm from '../../components/service/editServiceForm';
import { useRouter } from 'next/router';
import request from 'superagent';
import BuildPath from '../../components/pathBuilder';
import { useEffect, useState } from 'react';

function ServiceEditFormPage() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const employeeList = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'];
  const [serviceItem, setServiceItem] = useState({});
  const [loading, setLoading] = useState(undefined);

  const id = router.query.editId;
  const getServiceInfo = async () => {
    await request
      .get(BuildPath('services/' + id))
      .set('Accept', 'application/json')
      .then((res) => {
        setServiceItem(res.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setLoading(true);
    getServiceInfo().then((r) => setLoading(false));
    //    get employee list
  }, []);
  useEffect(() => {}, [serviceItem]);
  const editHandle = async (data) => {
    await request
      .put(BuildPath('services/' + id))
      .send(data)
      .set('Accept', 'application/json')
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {!loading && (
        <EditServiceForm
          editHandle={editHandle}
          serviceItem={serviceItem}
          employeeList={employeeList}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
}
export default ServiceEditFormPage;
