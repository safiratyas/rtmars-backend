const {
  Golongan_Darah
} = require("../models");

module.exports = {
  create(inputData) {
    return Golongan_Darah.create(inputData);
  },

  delete(id) {
    return Golongan_Darah.destroy({
      where: {
        id
      }
    });
  },

  find(id) {
    return Golongan_Darah.findByPk(id);
  },

  findAll() {
    return Golongan_Darah.findAll();
  },

  findOne(key) {
    return Golongan_Darah.findOne(key);
  },

  getTotalBloodTypes() {
    return Golongan_Darah.count();
  },
};