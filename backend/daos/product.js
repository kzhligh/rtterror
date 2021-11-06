const { Product } = require('../models/product');

async function getAllProductRecords() {
  try {
    return await Product.findAll({ raw: true });
  } catch (error) {
    console.error(error);
  }
}

async function getProductRecordById(productId) {
  try {
    return await Product.findByPk(productId, { raw: true });
  } catch (error) {
    console.error(error);
  }
}

async function createProductRecord(productObj) {
  try {
    return Product.create(productObj, { raw: true });
  } catch (error) {
    console.error(error);
  }
}

async function updateProductRecord(productObj) {
  const { id } = productObj;
  try {
    return Product.update(productObj, {
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

async function deleteProductRecordById(productId) {
  try {
    return Product.destroy({
      where: {
        id: productId,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getAllProductRecords,
  getProductRecordById,
  createProductRecord,
  updateProductRecord,
  deleteProductRecordById,
};
