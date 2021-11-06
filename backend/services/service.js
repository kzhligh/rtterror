const {
  getAllServiceRecords,
  getServiceRecordById,
  createServiceRecord,
  updateServiceRecord,
  deleteServiceRecordById,
} = require('../daos/service');

async function getAllServices() {
  return await getAllServiceRecords();
}

async function getServiceById(serviceId) {
  if (typeof serviceId === 'string') {
    const service = await getServiceRecordById(serviceId);
    if (!service) {
      console.error('ERROR - no record found of the id: ', serviceId);
      throw new Error(
        `ERROR - No such a service is found with the id: ${serviceId}`
      );
    }
    return service;
  } else {
    throw new Error(`ERROR - unexpected input type: ${typeof serviceId}`);
  }
}

async function createService(serviceObj) {
  console.log('createService()/serviceObj', serviceObj);
  const {
    serviceCode,
    name,
    description,
    treatment_type,
    duration,
    price,
    barcode,
    sms_description,
    blocked,
  } = serviceObj;
  if (
    serviceCode &&
    name &&
    description &&
    treatment_type &&
    duration &&
    price &&
    barcode &&
    sms_description &&
    blocked
  ) {
    return await createServiceRecord(serviceObj);
  } else {
    throw new Error('ERROR - missing property for service');
  }
}

async function updateService(serviceObj) {
  const { id } = serviceObj;
  if (id && typeof id === 'string') {
    const numberOfUpdate = await updateServiceRecord(serviceObj);
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

async function deleteServiceById(serviceId) {
  if (typeof serviceId === 'string') {
    const numberOfDeletion = await deleteServiceRecordById(serviceId);
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

async function blockServiceById(serviceId) {
  const serviceObj = await getServiceById(serviceId);
  serviceObj.blocked = true;
  await updateService(serviceObj);
  const updatedService = await getServiceById(serviceId);
  return updatedService;
}

async function unblockServiceById(serviceId) {
  const serviceObj = await getServiceById(serviceId);
  serviceObj.blocked = false;
  await updateService(serviceObj);
  const updatedService = await getServiceById(serviceId);
  return updatedService;
}

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteServiceById,
  blockServiceById,
  unblockServiceById,
};
