const { validate: uuidValidate } = require('uuid');

const {
    getAllValidEmployeeRecords,
    getServiceEmployeeRecordsByEmployeeId,
    createServiceEmployeeRecord,
    updateServiceEmployeeRecordsByEmployeeId,
    deleteServiceEmployeeRecordsByEmployeeId,
  }= require('../daos/services_employees');


const { deleteServiceEmployeeRecordsByEmployeeId } = require('../daos/services_employees');
const { getServiceRecordByIdForEmployee } = require('../daos/service');



async function getAllValidEmployee() {
    return await getAllValidEmployeeRecords();
  }



  async function addEmployee(EmployeeObj, serviceIds) {

  
    const { firstName, lastName, speciality } = EmployeeObj;
    if (firstName && lastName && speciality ) {
      return await addEmployeeRecord(EmployeeObj, serviceIds);
    } else {
      throw new Error('ERROR - missing property for service');
    }
  }


  async function deleteEmployeeById(EmployeeId) {
    
  
    await deleteEmployeeRecordById(EmployeeId);
    await deleteServiceEmployeeRecordsByEmployeeId(EmployeeId);
  }