const {
  Pengurus
} = require("../models");

module.exports = {
  find(id) {
    return Pengurus.findByPk(id);
  },

  findAll() {
    return Pengurus.findAll();
  },

  findOne(key) {
    return Pengurus.findOne(key);
  },

  getTotalPengurus() {
    return Pengurus.count();
  },
};