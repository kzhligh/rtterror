const { v4: uuidv4 } = require('uuid');
const { Employee } = require('../models/employees');
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

async function getEmployeeRecordById(employeeId) {
  try {
    return await Employee.findByPk(employeeId, { include: Service });
  } catch (error) {
    console.error(error);
  }
}

async function createEmployeeRecord(employeeObj, serviceIds) {
  try {
    employeeObj.id = uuidv4();
    const employee = await Employee.create(employeeObj);
    for (let serviceId of serviceIds) {
      let service = await getServiceRecordByIdForEmployee(serviceId);
      await employee.addService(service);
    }
    return await getEmployeeRecordById(employeeObj.id);
  } catch (error) {
    console.error(error);
  }
}

async function updateEmployeeRecord(employeeObj) {
  const { id } = employeeObj;
  try {
    return Employee.update(employeeObj, {
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

async function deleteEmployeeRecordById(employeeId) {
  try {
    return Employee.destroy({
      where: {
        id: employeeId,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getAllValidEmployeeRecords,
  getEmployeeRecordById,
  createEmployeeRecord,
  updateEmployeeRecord,
  deleteEmployeeRecordById,
};
