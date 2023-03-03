'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pekerjaan extends Model {
    static associate(models) {
      this.hasMany(models.Warga, {
        foreignKey: 'id_pekerjaan',
        as: 'pekerjaan',
      });
    }
  }
  Pekerjaan.init({
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pekerjaan',
  });
  return Pekerjaan;
};