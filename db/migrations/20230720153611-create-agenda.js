'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Agendas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jenis_kegiatan: {
        type: Sequelize.STRING
      },
      keterangan: {
        type: Sequelize.STRING
      },
      foto_kegiatan: {
        type: Sequelize.STRING
      },
      id_warga: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Wargas",
          },
          key: "id",
        },
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
    await queryInterface.dropTable('Agendas');
  }
};