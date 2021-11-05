import ServiceComponent from "../../components/service";
import BuildPath from "../../components/pathBuilder";
import request from 'superagent';

// we can use regular react state or fetch the data with super agent  or use getStaticProps
function Service(props) {
  const { serviceListData } = props;
  return (
    <div>
      <h1>Service</h1>
      <ServiceComponent serviceListData={serviceListData}/>
    </div>
  );
}

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

export default Service;
