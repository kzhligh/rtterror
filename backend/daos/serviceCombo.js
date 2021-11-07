const { Service_Combo } = require('../models/serviceCombo');

async function getServiceComboRecordsByComboId(comboId) {
  try {
    return await Service_Combo.findAll({
      raw: true,
      where: {
        comboId: comboId,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

async function createServiceComboRecord(serviceComboObj) {
  try {
    return await Service_Combo.create(serviceComboObj);
  } catch (error) {
    console.error(error);
  }
}

async function updateServiceComboRecordsByComboId(serviceComboObj) {
  const { comboId } = serviceComboObj;
  try {
    return await Service_Combo.update(
      {
        serviceId: serviceComboObj.serviceId,
      },
      {
        where: {
          comboId: comboId,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
}

async function deleteServiceComboRecordsByComboId(comboId) {
  try {
    return await Service_Combo.destroy({
      where: {
        comboId: comboId,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getServiceComboRecordsByComboId,
  createServiceComboRecord,
  updateServiceComboRecordsByComboId,
  deleteServiceComboRecordsByComboId,
};
