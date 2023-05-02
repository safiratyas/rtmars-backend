'use strict';

/** @type {import('sequelize-cli').Migration} */

const religions = [
  "Islam",
  "Kristen",
  "Katolik",
  "Hindu",
  "Budha",
  "Lainnya"
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const religion = religions.map((list) => ({
      nama: list,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Agamas', religion, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Agamas', null, {});
  }
};