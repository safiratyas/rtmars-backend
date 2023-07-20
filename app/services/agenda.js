const {
  Pengurus
} = require("../models");

module.exports = {
  create(inputData) {
    return Pengurus.create(inputData);
  },

  update(id, updateData) {
    return Pengurus.update(updateData, {
      where: {
        id
      }
    });
  },

  delete(id) {
    return Pengurus.destroy({
      where: {
        id
      }
    });
  },

  find(id) {
    return Pengurus.findByPk(id);
  },

  findAll() {
    return Pengurus.findAll();
  },

  findOne(key) {
    return Pengurus.findOne(key);
  },

  getTotalAdmins() {
    return Pengurus.count();
  },
};