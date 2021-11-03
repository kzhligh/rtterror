const Service = require('../models/service');

async function getAllServiceRecords() {
  try {
    return await Service.findAll({ raw: true });
  } catch (error) {
    console.error(error);
  }
}

async function getServiceRecordById(serviceId) {
  try {
    return await Service.findByPk(serviceId);
  } catch (error) {
    console.error(error);
  }
}

async function createServiceRecord(serviceObj) {
  try {
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
