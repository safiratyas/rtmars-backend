'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pendataan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Pengurus, {
        foreignKey: 'id_pengurus',
        as: 'dasawisma',
      });
    }
  }
  Pendataan.init({
    id_pengurus: DataTypes.INTEGER,
    jumlah_rumah: DataTypes.INTEGER,
    jumlah_keluarga: DataTypes.INTEGER,
    jumlah_warga: DataTypes.INTEGER,
    jumlah_bayi: DataTypes.INTEGER,
    jumlah_meninggal: DataTypes.INTEGER,
    jumlah_pindahan: DataTypes.INTEGER,
    kegiatan_pancasila: DataTypes.BOOLEAN,
    kegiatan_gotong_royong: DataTypes.BOOLEAN,
    kegiatan_pangan: DataTypes.BOOLEAN,
    kegiatan_sandang: DataTypes.BOOLEAN,
    kegiatan_tata_laksana: DataTypes.BOOLEAN,
    kegiatan_pendidikan_terampil: DataTypes.BOOLEAN,
    kegiatan_kesehatan: DataTypes.BOOLEAN,
    kegiatan_pengembangan_koperasi: DataTypes.BOOLEAN,
    kegiatan_kelestarian: DataTypes.BOOLEAN,
    kegiatan_perencanaan_sehat: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Pendataan',
  });
  return Pendataan;
};