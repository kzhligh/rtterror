const { Product } = require('../models/product');

async function getAllRecords() {
  try {
    return await Product.findAll({ raw: true });
  } catch (error) {
    console.error(error);
  }
}

async function getRecordById(productId) {
  try {
    return await Product.findByPk(productId);
  } catch (error) {
    console.error(error);
  }
}

async function createRecord(productObj) {
  try {
    return Product.create(productObj);
  } catch (error) {
    console.error(error);
  }
}

async function updateRecord(productObj) {
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

async function deleteRecordById(productId) {
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
  getAllRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecordById,
};
