import ServiceForm from "../../components/service/serviceForm";

export async function getStaticProps(context) {
    console.log(context);
    // const serviceId = context.params.details.serviceid;
    const res = await fetch(
        "https://api.github.com/repos/visionmedia/superagent"
    );
    const serviceItem = [
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
        }
    ];
    return {
        props: { serviceItem: serviceItem }, // will be passed to the page component as props
    };
}

function ServiceEditFormPage(props){
    const {serviceItem} = props;
    const editHandle=(data)=>{
        console.log('add');
    }
    return (
        <>
            <ServiceForm editHandle={editHandle} serviceItem={serviceItem}/>
        </>
    )
}
export default ServiceEditFormPage;