const {
  Pendidikan
} = require("../models");

module.exports = {
  create(inputData) {
    return Pendidikan.create(inputData);
  },

  delete(id) {
    return Pendidikan.destroy({
      where: {
        id
      }
    });
  },

  find(id) {
    return Pendidikan.findByPk(id);
  },

  findAll() {
    return Pendidikan.findAll();
  },

  findOne(key) {
    return Pendidikan.findOne(key);
  },

  getTotalEducations() {
    return Pendidikan.count();
  },
};