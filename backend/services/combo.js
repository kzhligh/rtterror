const { validate: uuidValidate } = require('uuid');
const {
  getAllValidComboRecords,
  getComboRecordById,
  createComboRecord,
  updateComboRecord,
  deleteComboRecordById,
} = require('../daos/combo');
const { deleteServiceComboRecordsByComboId } = require('../daos/serviceCombo');
const { getServiceRecordByIdForCombo } = require('../daos/service');

async function getAllValidCombos() {
  return await getAllValidComboRecords();
}

async function getComboById(comboId) {
  if (typeof comboId === 'string' && uuidValidate(comboId)) {
    const combo = await getComboRecordById(comboId);
    if (!combo) {
      console.error('ERROR - no record found of the id: ', comboId);
      throw new Error(
        `ERROR - No such a service is found with the id: ${comboId}`
      );
    }
    return combo;
  } else {
    throw new Error(`ERROR - unexpected input type: ${typeof comboId}`);
  }
}

async function createCombo(comboObj, serviceIds) {
  // todo - validate serviceIds

  const { name, serviceCode, total_duration, total_price } = comboObj;
  if (name && serviceCode && total_duration && total_price) {
    return await createComboRecord(comboObj, serviceIds);
  } else {
    throw new Error('ERROR - missing property for service');
  }
}

// update both combo and service_combo table
async function updateCombo(comboObj, serviceIds) {
  // todo - validate comboObj and serviceIds

  // update combo
  const { id } = comboObj;
  await updateComboRecord(comboObj);
  const combo = await getComboById(id);

  await deleteServiceComboRecordsByComboId(id);

  for (let serviceId of serviceIds) {
    let service = await getServiceRecordByIdForCombo(serviceId);
    await combo.addService(service);
  }
  return await getComboRecordById(id);
}

async function deleteComboById(comboId) {
  // todo - validate comboId

  await deleteComboRecordById(comboId);
  await deleteServiceComboRecordsByComboId(comboId);
}

async function blockComboById(comboId) {
  // todo - validate comboId

  const comboObj = await getComboById(comboId);
  const newCombo = comboObj.get({ plain: true });
  delete newCombo.services;
  newCombo.blocked = true;
  await updateComboRecord(newCombo);
  return await getComboById(comboId);
}

async function unblockComboById(comboId) {
  // todo - validate comboId

  const comboObj = await getComboById(comboId);
  const newCombo = comboObj.get({ plain: true });
  delete newCombo.services;
  newCombo.blocked = false;
  await updateComboRecord(newCombo);
  return await getComboById(comboId);
}

module.exports = {
  getAllValidCombos,
  getComboById,
  createCombo,
  updateCombo,
  deleteComboById,
  blockComboById,
  unblockComboById,
};
