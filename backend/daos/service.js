const { Service } = require('../models/service');
const { v4: uuidv4 } = require('uuid');

async function getAllServiceRecords() {
  try {
    return await Service.findAll({ raw: true });
  } catch (error) {
    console.error(error);
  }
}

async function getServiceRecordById(serviceId) {
  try {
    return await Service.findByPk(serviceId, { raw: true });
  } catch (error) {
    console.error(error);
  }
}

async function createServiceRecord(serviceObj) {
  try {
    serviceObj.id = uuidv4();
    console.log(serviceObj);
    return Service.create(serviceObj);
  } catch (error) {
    console.error(error);
  }
}

async function updateServiceRecord(serviceObj) {
  const { id } = serviceObj;
  try {
    return Service.update(serviceObj, {
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

async function deleteServiceRecordById(serviceId) {
  try {
    return Service.destroy({
      where: {
        id: serviceId,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getAllServiceRecords,
  getServiceRecordById,
  createServiceRecord,
  updateServiceRecord,
  deleteServiceRecordById,
};
