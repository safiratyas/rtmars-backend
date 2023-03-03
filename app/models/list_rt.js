'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List_RT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  List_RT.init({
    nama_lengkap: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING,
    tahun_jabatan: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'List_RT',
  });
  return List_RT;
};