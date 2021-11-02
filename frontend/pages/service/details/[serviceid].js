import ServiceCard from "../../../components/service/serviceCard";

export async function getStaticProps() {
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

function DetailPage(){
    const addHandle=(data)=>{
        console.log('add');
    }
    return (
        <>
            <ServiceCard />
        </>
    )

}
export default DetailPage;