const {
  Pendataan
} = require("../models");

module.exports = {
  create(inputData) {
    return Pendataan.create(inputData);
  },

  update(id, updateData) {
    return Pendataan.update(updateData, {
      where: {
        id
      }
    });
  },

  delete(id) {
    return Pendataan.destroy({
      where: {
        id
      }
    });
  },

  find(id) {
    return Pendataan.findByPk(id);
  },

  findAll() {
    return Pendataan.findAll();
  },

  findOne(key) {
    return Pendataan.findOne(key);
  },

  getTotalReports() {
    return Pendataan.count();
  },
};