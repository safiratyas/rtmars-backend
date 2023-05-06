'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {

    const educations = [
      "SD",
      "SMP",
      "SMA",
      "D3",
      "D4",
      "S1",
      "S2",
      "S3",
      "Lainnya"
    ]

    const education = educations.map((edu) => ({
      nama: edu,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Pendidikans', education, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pendidikans', null, {});
  }
};