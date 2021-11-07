const { validate: uuidValidate } = require('uuid');
const {
  getAllValidEmployeeRecords,
  getEmployeeRecordById,
  createEmployeeRecord,
  updateEmployeeRecord,
  deleteEmployeeRecordById,
} = require('../daos/employees');
const { deleteServiceEmployeeRecordsByEmployeeId} = require('../daos/services_employees');
const { getServiceRecordByIdForEmployee } = require('../daos/service');

async function getAllValidEmployee() {
  return await getAllValidEmployeeRecords();
}

async function getEmployeeById(EmployeeId) {
  if (typeof EmployeeId === INTEGER && uuidValidate(EmployeeId)) {
    const employees = await getEmployeeRecordById(EmployeeId);
    if (!employees) {
      console.error('ERROR - no record found of the id: ', EmployeeId);
      throw new Error(
        `ERROR - No such a service is found with the id: ${EmployeeId}`
      );
    }
    return employees;
  } else {
    throw new Error(`ERROR - unexpected input type: ${typeof EmployeeId}`);
  }
}

async function addEmployee(EmployeeObj, serviceIds) {


  const { firstName, lastName, speciality } = EmployeeObj;
  if (firstName && lastName && speciality) {
    return await createEmployeeRecord(EmployeeObj, serviceIds);
  } else {
    throw new Error('ERROR -missing attribute');
  }
}

async function updateEmployee(EmployeeObj, serviceIds) {

  const { id } = EmployeeObj;
  await updateEmployeeRecord(EmployeeObj);
  const employee = await getEmployeeById(id);

  await deleteServiceEmployeeRecordsByEmployeeId(id);

  for (let serviceId of serviceIds) {
    let service = await getServiceRecordByIdForEmployee(serviceId);
    await employee.addService(service);
  }
  return await getEmployeeRecordById(id);
}

async function deleteEmployeeById(EmployeeId) {
  await deleteEmployeeRecordById(EmployeeId);
  await deleteServiceEmployeeRecordsByEmployeeId(EmployeeId);
}

module.exports = {
  getAllValidEmployee,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployeeById,
};
