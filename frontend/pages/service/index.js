import NavSection from "../../components/Layout"
import request from "superagent";
import PrimarySearchAppBar from "../../components/Layout";

// we can use regular react state or fetch the data with super agent  or use getStaticProps
function Service(props){
    const {text} = props
    return(
        <box>
            <PrimarySearchAppBar />
            <h1>Service</h1>
            <h2>{text}</h2>
        </box>
    )
}

// fetch the data from the back end without using the set prop, drawback not update
export async function getStaticProps() {
    var resstatus='';
    const res = await fetch('https://api.github.com/repos/visionmedia/superagent')
    resstatus = 'sucess'

    return {
        props: { text: resstatus }, // will be passed to the page component as props
    }
}
export default Service;