const {
  getAllProductRecords,
  getProductRecordById,
  createProductRecord,
  updateProductRecord,
  deleteProductRecordById,
} = require('../daos/product');

async function getAllProducts() {
  return await getAllProductRecords();
}

async function getProductById(productId) {
  if (typeof productId === 'string') {
    const product = await getProductRecordById(productId);
    if (!product) {
      console.error('ERROR - no record found of the id: ', productId);
      throw new Error(
        `ERROR - No such a product is found with the id: ${productId}`
      );
    }
    return product;
  } else {
    throw new Error(`ERROR - unexpected input type: ${typeof productId}`);
  }
}

async function createProduct(productObj) {
  const { id, name, price, inventory } = productObj;
  if (id && name && price && inventory) {
    return await createProductRecord(productObj);
  } else {
    throw new Error('ERROR - missing property for product');
  }
}

async function updateProduct(productObj) {
  const { id } = productObj;
  if (id && typeof id === 'string') {
    const numberOfUpdate = await updateProductRecord(productObj);
    if (numberOfUpdate > 0) {
      return numberOfUpdate;
    } else {
      throw new Error(`ERROR - No such a product is found with the id: ${id}`);
    }
  } else {
    throw new Error(
      'ERROR - no id has been specified in the input product object'
    );
  }
}

async function deleteProductById(productId) {
  if (typeof productId === 'string') {
    const numberOfDeletion = await deleteProductRecordById(productId);
    if (numberOfDeletion > 0) {
      return numberOfDeletion;
    } else {
      throw new Error(
        `ERROR - No such a product is found with the id: ${productId}`
      );
    }
  } else {
    throw new Error(`ERROR - unexpected input type: ${typeof productId}`);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
};
