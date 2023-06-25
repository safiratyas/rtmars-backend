'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Surat extends Model {
    static associate(models) {
      this.belongsTo(models.Warga, {
        foreignKey: 'id_warga',
        as: 'warga',
      });
    }
  }
  Surat.init({
    tanggal_pengajuan: DataTypes.STRING,
    jenis_dokumen: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    id_warga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Surat',
  });
  return Surat;
};