const {
  Agama
} = require("../models");

module.exports = {
  create(inputData) {
    return Agama.create(inputData);
  },

  delete(id) {
    return Agama.destroy({
      where: {
        id
      }
    });
  },

  find(id) {
    return Agama.findByPk(id);
  },

  findAll() {
    return Agama.findAll();
  },

  findOne(key) {
    return Agama.findOne(key);
  },

  getTotalReligions() {
    return Agama.count();
  },
};