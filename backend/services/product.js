const {
  getAllRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecordById,
} = require('../daos/product');

async function getAllProducts() {
  return await getAllRecords();
}

async function getProductById(serviceId) {
  if (typeof serviceId === 'string') {
    const service = await getRecordById(serviceId);
    if (!service) {
      console.error('ERROR - no record found of the id: ', serviceId);
      throw new Error(
        `ERROR - No such a service is found with the id: ${serviceId}`
      );
    }
    return service.dataValues;
  } else {
    throw new Error(`ERROR - unexpected input type: ${typeof serviceId}`);
  }
}

async function createProduct(serviceObj) {
  const {
    id,
    name,
    description,
    treatment_type,
    duration,
    price,
    barcode,
    sms_description,
  } = serviceObj;
  if (
    id &&
    name &&
    description &&
    treatment_type &&
    duration &&
    price &&
    barcode &&
    sms_description
  ) {
    return await createRecord(serviceObj);
  } else {
    throw new Error('ERROR - missing property for service');
  }
}

async function updateProduct(serviceObj) {
  const { id } = serviceObj;
  if (id && typeof id === 'string') {
    const numberOfUpdate = await updateRecord(serviceObj);
    if (numberOfUpdate > 0) {
      return numberOfUpdate;
    } else {
      throw new Error(`ERROR - No such a service is found with the id: ${id}`);
    }
  } else {
    throw new Error(
      'ERROR - no id has been specified in the input service object'
    );
  }
}

async function deleteProductById(serviceId) {
  if (typeof serviceId === 'string') {
    const numberOfDeletion = await deleteRecordById(serviceId);
    if (numberOfDeletion > 0) {
      return numberOfDeletion;
    } else {
      throw new Error(
        `ERROR - No such a service is found with the id: ${serviceId}`
      );
    }
  } else {
    throw new Error(`ERROR - unexpected input type: ${typeof serviceId}`);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
};
