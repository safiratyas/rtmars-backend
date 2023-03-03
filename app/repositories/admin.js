const {
  Admin
} = require("../models");

module.exports = {
  find(id) {
    return Admin.findByPk(id);
  },

  findAll() {
    return Admin.findAll();
  },

  findOne(key) {
    return Admin.findOne(key);
  },

  getTotalAdmins() {
    return Admin.count();
  },
};