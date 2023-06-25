const {
  Surat
} = require("../models");

module.exports = {
  create(inputData) {
    return Surat.create(inputData);
  },

  update(id, updateData) {
    return Surat.update(updateData, {
      where: {
        id
      }
    });
  },

  delete(id) {
    return Surat.destroy({
      where: {
        id
      }
    });
  },

  find(id) {
    return Surat.findByPk(id);
  },

  findAll() {
    return Surat.findAll();
  },

  findOne(key) {
    return Surat.findOne(key);
  },

  getTotalDocuments() {
    return Surat.count();
  },
};