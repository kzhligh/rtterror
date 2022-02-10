// we can use regular react state or fetch the data with super agent  or use getStaticProps
function Appointment(props) {
    const { text } = props;
    return (
        <box>
            <h1>Appointment</h1>
            <h2>{text}</h2>
        </box>
    );
}

export default Appointment;
