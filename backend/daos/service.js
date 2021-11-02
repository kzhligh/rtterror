const Service = require('../models/service');

// const serviceModel = Service();

async function getAllRecords() {
  try {
    return await Service.findAll({ raw: true });
  } catch (error) {
    console.error(error);
  }
}

async function getRecordById(serviceId) {
  try {
    return await Service.findByPk(serviceId);
  } catch (error) {
    console.error(error);
  }
}

async function createRecord(serviceObj) {
  try {
    return Service.create(serviceObj);
  } catch (error) {
    console.error(error);
  }
}

async function updateRecord(serviceObj) {
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

async function deleteRecordById(serviceId) {
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
  getAllRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecordById,
};
