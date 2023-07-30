'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pengurus extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Warga, {
        foreignKey: 'id_pengurus',
        as: 'pengurus',
      });
      this.hasMany(models.Pendataan, {
        foreignKey: 'id_pengurus',
        as: 'dasawisma',
      });
    }
  }
  Pengurus.init({
    user_id: DataTypes.STRING,
    nama_lengkap: DataTypes.STRING,
    password: DataTypes.STRING,
    nama: DataTypes.STRING,
    no_ktp: DataTypes.STRING,
    rt: DataTypes.STRING,
    rw: DataTypes.STRING,
    kelurahan: DataTypes.STRING,
    kecamatan: DataTypes.STRING,
    kota_kabupaten: DataTypes.STRING,
    foto_pengurus: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    tipe_pengurus: DataTypes.STRING,
    gender: DataTypes.STRING,
    tempat_lahir: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATEONLY,
    nama_kelompok_dasawisma: DataTypes.STRING,
    umur: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pengurus',
  });
  return Pengurus;
};