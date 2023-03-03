'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pendidikan extends Model {
    static associate(models) {
      this.hasMany(models.Warga, {
        foreignKey: 'id_pendidikan',
        as: 'pendidikan',
      });
    }
  }
  Pendidikan.init({
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pendidikan',
  });
  return Pendidikan;
};