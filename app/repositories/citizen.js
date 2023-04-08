const {
  Warga
} = require("../models");

module.exports = {
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