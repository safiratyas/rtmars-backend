'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agenda extends Model {
    static associate(models) {
    }
  }
  Agenda.init({
    jenis_kegiatan: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    foto_kegiatan: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Agenda',
  });
  return Agenda;
};