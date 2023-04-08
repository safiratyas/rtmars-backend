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
  }, {
    sequelize,
    modelName: 'Pengurus',
  });
  return Pengurus;
};