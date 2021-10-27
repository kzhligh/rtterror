import ServiceComponent from "../../components/service";

// we can use regular react state or fetch the data with super agent  or use getStaticProps
function Service(props) {
  const { text } = props;
  return (
    <div>
      <h1>Service</h1>
      <ServiceComponent />
    </div>
  );
}

// fetch the data from the back end without using the set prop, drawback not update
export async function getStaticProps() {
  var resstatus = "";
  const res = await fetch(
    "https://api.github.com/repos/visionmedia/superagent"
  );
  resstatus = "sucess";

  return {
    props: { text: resstatus }, // will be passed to the page component as props
  };
}
export default Service;
