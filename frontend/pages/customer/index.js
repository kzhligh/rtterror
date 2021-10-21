import NavSection from "../../components/navbar"
import request from "superagent";

// we can use regular react state or fetch the data with super agent  or use getStaticProps
function customer(props){
    const {text} = props
    return(
        <box>
            <h1>Customer</h1>
            <h2>{text}</h2>
            <NavSection></NavSection>
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
export default customer;