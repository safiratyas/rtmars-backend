'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pendataans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pengurus: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Pengurus",
          },
          key: "id",
        },
      },
      jumlah_rumah: {
        type: Sequelize.INTEGER
      },
      jumlah_keluarga: {
        type: Sequelize.INTEGER
      },
      jumlah_warga: {
        type: Sequelize.INTEGER
      },
      jumlah_bayi: {
        type: Sequelize.INTEGER
      },
      jumlah_meninggal: {
        type: Sequelize.INTEGER
      },
      jumlah_pindahan: {
        type: Sequelize.INTEGER
      },
      kegiatan_pancasila: {
        type: Sequelize.BOOLEAN
      },
      kegiatan_gotong_royong: {
        type: Sequelize.BOOLEAN
      },
      kegiatan_pangan: {
        type: Sequelize.BOOLEAN
      },
      kegiatan_sandang: {
        type: Sequelize.BOOLEAN
      },
      kegiatan_tata_laksana: {
        type: Sequelize.BOOLEAN
      },
      kegiatan_pendidikan_terampil: {
        type: Sequelize.BOOLEAN
      },
      kegiatan_kesehatan: {
        type: Sequelize.BOOLEAN
      },
      kegiatan_pengembangan_koperasi: {
        type: Sequelize.BOOLEAN
      },
      kegiatan_kelestarian: {
        type: Sequelize.BOOLEAN
      },
      kegiatan_perencanaan_sehat: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pendataans');
  }
};