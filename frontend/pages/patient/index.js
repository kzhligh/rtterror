// we can use regular react state or fetch the data with super agent  or use getStaticProps
function Patient(props){
    const {text} = props
    return(

        <div>
            <h1>
                Patient
            </h1>
        </div>

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
export default Patient;