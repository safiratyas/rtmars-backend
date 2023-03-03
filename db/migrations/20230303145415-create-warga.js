'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wargas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_lengkap: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      jenis_kelamin: {
        type: Sequelize.STRING
      },
      umur: {
        type: Sequelize.INTEGER
      },
      no_nik: {
        type: Sequelize.INTEGER
      },
      no_kk: {
        type: Sequelize.INTEGER
      },
      tempat_lahir: {
        type: Sequelize.STRING
      },
      tanggal_lahir: {
        type: Sequelize.DATEONLY
      },
      id_agama: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Agamas",
          },
          key: "id",
        },
      },
      id_pendidikan: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Pendidikans",
          },
          key: "id",
        },
      },
      id_pekerjaan: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Pekerjaans",
          },
          key: "id",
        },
      },
      id_gol_darah: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Golongan_Darahs",
          },
          key: "id",
        },
      },
      kewarganegaraan: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Wargas');
  }
};