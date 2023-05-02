'use strict';

/** @type {import('sequelize-cli').Migration} */

const jobs = [
  "Karyawan Swasta",
  "Karyawan Honorer",
  "Pegawai Negeri",
  "Pengusaha",
  "Dosen",
  "Guru",
  "Seniman",
  "Arsitek",
  "Pedagang",
  "Wiraswasta",
  "Pensiunan",
  "Mengurus Rumah Tangga",
  "Belum Bekerja",
  "Lainnya"
]

module.exports = {
  async up (queryInterface, Sequelize) {
    const job = jobs.map((list) => ({
      nama: list,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Pekerjaans', job, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pekerjaans', null, {});
  }
};
