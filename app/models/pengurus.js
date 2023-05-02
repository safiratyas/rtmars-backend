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
    }
  }
  Pengurus.init({
    user_id: DataTypes.STRING,
    password: DataTypes.STRING,
    nama: DataTypes.STRING,
    foto_pengurus: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    tipe_pengurus: DataTypes.STRING,
    gender: DataTypes.STRING,
    tempat_lahir: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATEONLY,
    umur: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pengurus',
  });
  return Pengurus;
};