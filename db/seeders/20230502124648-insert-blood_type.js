'use strict';

/** @type {import('sequelize-cli').Migration} */

const bloodTypes = [
  "A",
  "B",
  "O",
  "AB"
]

module.exports = {
  async up (queryInterface, Sequelize) {
    const bloodType = bloodTypes.map((blood) => ({
      nama: blood,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Golongan_Darahs', bloodType, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Golongan_Darahs', null, {});
  }
};
