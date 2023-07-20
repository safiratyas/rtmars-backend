'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agenda extends Model {
    static associate(models) {
      this.belongsTo(models.Warga, {
        foreignKey: 'id_agenda',
        as: 'agenda',
      });
    }
  }
  Agenda.init({
    jenis_kegiatan: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    foto_kegiatan: DataTypes.STRING,
    id_warga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Agenda',
  });
  return Agenda;
};