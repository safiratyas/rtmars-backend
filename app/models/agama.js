'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agama extends Model {
    static associate(models) {
      this.hasMany(models.Warga, {
        foreignKey: 'id_agama',
        as: 'agama',
      });
    }
  }
  Agama.init({
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Agama',
  });
  return Agama;
};