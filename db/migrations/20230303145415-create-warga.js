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
      email: {
        type: Sequelize.STRING
      },
      password: {
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
        type: Sequelize.STRING
      },
      no_kk: {
        type: Sequelize.STRING
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
      id_pengurus: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Pengurus",
          },
          key: "id",
        },
      },
      foto_warga: {
        type: Sequelize.STRING
      },
      foto_kk: {
        type: Sequelize.STRING
      },
      foto_ktp: {
        type: Sequelize.STRING
      },
      kewarganegaraan: {
        type: Sequelize.STRING
      },
      no_hp: {
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