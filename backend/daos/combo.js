const { v4: uuidv4 } = require('uuid');
const { Combo } = require('../models/combo');
const { getServiceRecordByIdForCombo } = require('./service');
const { Service } = require('../models/service');

async function getAllValidComboRecords() {
  try {
    return await Combo.findAll({
      include: Service
    });
  } catch (error) {
    console.error(error);
  }
}

async function getComboRecordById(comboId) {
  try {
    return await Combo.findByPk(comboId, { include: Service });
  } catch (error) {
    console.error(error);
  }
}

async function createComboRecord(comboObj, serviceIds) {
  try {
    comboObj.id = uuidv4();
    const combo = await Combo.create(comboObj);
    for (let serviceId of serviceIds) {
      let service = await getServiceRecordByIdForCombo(serviceId);
      await combo.addService(service);
    }
    return await getComboRecordById(comboObj.id);
  } catch (error) {
    console.error(error);
  }
}

async function updateComboRecord(comboObj) {
  const { id } = comboObj;
  try {
    return Combo.update(comboObj, {
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

async function deleteComboRecordById(comboId) {
  try {
    return Combo.destroy({
      where: {
        id: comboId,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getAllValidComboRecords,
  getComboRecordById,
  createComboRecord,
  updateComboRecord,
  deleteComboRecordById,
};
