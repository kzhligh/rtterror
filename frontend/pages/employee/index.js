import EmployeeComponent from "../../components/employee";


const Employee =()=>{
    const employeeList = [
        {'id': 1 , 'firstname': 'Jessica','lastname':'Lee', 'primary':'General Practice'},
        {'id': 2 ,'firstname': 'Shanna','lastname':'Huang', 'primary':'Acupuncture'},
        {'id': 3 ,'firstname': 'Albert','lastname':'Sheng', 'primary':'General Practice'},
        {'id': 4 ,'firstname': 'Greg','lastname':'Allard', 'primary':'General Practice'},
        {'id': 5 ,'firstname': 'Alan','lastname':'Rod', 'primary':'General Practice'},
        {'id': 6 ,'firstname': 'Beatrice','lastname':'Beauchamp', 'primary':'General Practice'},
        {'id': 7 ,'firstname': 'Sydney','lastname':'Shi', 'primary':'General Practice'}
    ];
    return (
        <div>
            <h1></h1>
            <EmployeeComponent employeeList={employeeList} />
        </div>
    );
}
export default Employee;