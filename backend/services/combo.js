const { validate: uuidValidate } = require('uuid');
const {
  getAllValidComboRecords,
  getComboRecordById,
  createComboRecord,
  updateComboRecord,
  deleteComboRecordById,
} = require('../daos/combo');

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

module.exports = {
  getAllValidCombos,
  getComboById,
  createCombo,
};
