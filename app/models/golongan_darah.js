'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Golongan_Darah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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