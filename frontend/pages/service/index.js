import ServiceComponent from "../../components/service";

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

// fetch the data from the back end without using the set prop, drawback not update
export async function getStaticProps() {
  var resstatus = "";
  const res = await fetch(
    "https://api.github.com/repos/visionmedia/superagent"
  );
  const serviceListData = [
    {
      serviceId: 1,
      treatmentType: "type1 ",
      name: "z ",
      description: "d",
      price: 100,
      duration: "1h30m",
      code: "code1",
      offerBy: ["E1", "E2"],
      status: "blocked",
      dateCreated: "2018 / 10/ 02",
    },
    {
      serviceId: 2,
      treatmentType: "type2 ",
      name: "a ",
      description: "c",
      price: 100,
      duration: "1h30m",
      code: "code2",
      offerBy: ["E1", "E2"],
      status: "active",
      dateCreated: "2018 / 10/ 03",
    },
    {
      serviceId: 3,
      treatmentType: "type3 ",
      name: "x ",
      description: "b",
      price: 100,
      duration: "1h30m",
      code: "code3",
      offerBy: ["E1", "E2"],
      status: "blocked",
      dateCreated: "2018 / 10/ 04",
    },
    {
      serviceId: 4,
      treatmentType: "type4 ",
      name: "y",
      description: "a",
      price: 100,
      duration: "1h30m",
      code: "code4",
      offerBy: ["E1", "E2"],
      status: "active",
      dateCreated: "2018 / 10/ 08",
    },
  ];
  return {
    props: { serviceListData: serviceListData },
    revalidate: 10
  };
}

export default Service;
