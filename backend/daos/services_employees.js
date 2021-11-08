const { v4: uuidv4 } = require('uuid');
const { Employee } = require('../models/employees');
const { Services_Employees } = require('../models/services_employees');
const { getServiceRecordByIdForEmployee } = require('./service');
const { Service } = require('../models/service');

async function getAllValidEmployeeRecords() {
  try {
    return await Employee.findAll({
    include: Service,
    where: {
      hidden: false,
    },
  });
} catch (error) {
  console.error(error);
}
}

async function getServiceEmployeeRecordsByEmployeeId(EmployeeId) {
  try {
    return await Employee.findByPk(EmployeeId, { include: Service});
  } catch (error) {
    console.error(error);
  }
}

async function createServiceEmployeeRecord(serviceEmployeeObj) {
  try {
    serviceEmployeeObj.id = uuidv4();
    const serviceEmployee = await Services_Employees.create(serviceEmployeeObj);
    for (let serviceId of serviceIds) {
      let service = await getServiceRecordByIdForEmployee(serviceId);
      await serviceEmployee.addService(service);
    }
    return await getServiceEmployeeRecordsByEmployeeId(serviceEmployeeObj.id);
  } catch (error) {
    console.error(error);
  }
}

async function updateServiceEmployeeRecordsByEmployeeId(serviceEmployeeObj) {
  const { EmployeeId } = serviceEmployeeObj;
  try {
    return await Services_Employees.update(
      {
        serviceId: serviceEmployeeObj.serviceId,
      },
      {
        where: {
          EmployeeId: EmployeeId,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
}

async function deleteServiceEmployeeRecordsByEmployeeId(EmployeeId) {
  try {
    return await Services_Employees.destroy({
      where: {
        EmployeeId: EmployeeId,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getAllValidEmployeeRecords,
  getServiceEmployeeRecordsByEmployeeId,
  createServiceEmployeeRecord,
  updateServiceEmployeeRecordsByEmployeeId,
  deleteServiceEmployeeRecordsByEmployeeId,
};
