'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Golongan_Darah extends Model {
    static associate(models) {
      this.hasMany(models.Warga, {
        foreignKey: 'id_gol_darah',
        as: 'gol_darah',
      });
    }
  }
  Golongan_Darah.init({
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Golongan_Darah',
  });
  return Golongan_Darah;
};