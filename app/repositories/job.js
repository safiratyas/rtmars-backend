const {
  Pekerjaan
} = require("../models");

module.exports = {
  create(inputData) {
    return Pekerjaan.create(inputData);
  },

  delete(id) {
    return Pekerjaan.destroy({
      where: {
        id
      }
    });
  },

  find(id) {
    return Pekerjaan.findByPk(id);
  },

  findAll() {
    return Pekerjaan.findAll();
  },

  findOne(key) {
    return Pekerjaan.findOne(key);
  },

  getTotalJobs() {
    return Pekerjaan.count();
  },
};