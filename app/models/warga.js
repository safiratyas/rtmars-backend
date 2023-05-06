'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warga extends Model {
    static associate(models) {
      this.belongsTo(models.Agama, {
        foreignKey: 'id_agama',
        as: 'agama',
      });
      this.belongsTo(models.Pendidikan, {
        foreignKey: 'id_pendidikan',
        as: 'pendidikan',
      });
      this.belongsTo(models.Pekerjaan, {
        foreignKey: 'id_pekerjaan',
        as: 'pekerjaan',
      });
      this.belongsTo(models.Golongan_Darah, {
        foreignKey: 'id_gol_darah',
        as: 'gol_darah',
      });
    }
  }
  Warga.init({
    nama_lengkap: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    alamat: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING,
    umur: DataTypes.INTEGER,
    no_nik: DataTypes.INTEGER,
    no_kk: DataTypes.INTEGER,
    tempat_lahir: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATEONLY,
    id_agama: DataTypes.INTEGER,
    id_pendidikan: DataTypes.INTEGER,
    id_pekerjaan: DataTypes.INTEGER,
    id_gol_darah: DataTypes.INTEGER,
    id_pengurus: DataTypes.INTEGER,
    foto_warga: DataTypes.STRING,
    foto_kk: DataTypes.STRING,
    foto_ktp: DataTypes.STRING,
    kewarganegaraan: DataTypes.STRING,
    no_hp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Warga',
  });
  return Warga;
};