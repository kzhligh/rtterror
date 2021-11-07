const { Employee } = require('../models/employees');
const { Services_Employees } = require('../models/services_employees');


async function getAllValidEmployeeRecords() {
  try {
    return await Employee.findAll({
      
    });
  } catch (error) {
    console.error(error);
  }
}

async function getServiceEmployeeRecordsByEmployeeId(EmployeeId) {
    try {
      return await Services_Employees.findAll({
        raw: true,
        where: {
            EmployeeId: EmployeeId,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  async function createServiceEmployeeRecord(serviceEmployeeObj) {
    try {
      return await Services_Employees.create(serviceEmployeeObj);
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