const {
  Warga
} = require("../models");

module.exports = {
  create(inputData) {
    return Warga.create(inputData);
  },

  update(id, updateData) {
    return Warga.update(updateData, {
      where: {
        id
      }
    });
  },

  delete(id) {
    return Warga.destroy({
      where: {
        id
      }
    });
  },

  find(id) {
    return Warga.findByPk(id);
  },

  findAll() {
    return Warga.findAll();
  },

  findOne(key) {
    return Warga.findOne(key);
  },

  getTotalCitizens() {
    return Warga.count();
  },
};