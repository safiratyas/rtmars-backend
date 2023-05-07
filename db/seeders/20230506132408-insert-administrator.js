'use strict';

/** @type {import('sequelize-cli').Migration} */

const {
  Op
} = require("sequelize");
const bcrypt = require("bcryptjs");

function getRandTwoDigits(args) {
  var getRandInt = Math.random().toString().substring(6, 8);
  if (getRandInt[0] === '0' && getRandInt[1] !== '0') {
    getRandInt = getRandInt[1];
  } else if (getRandInt[0] === '0' && getRandInt[1] === '0') {
    getRandInt = '1';
  }
  return getRandInt;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = "12345678";
    const encryptedPassword = bcrypt.hashSync(password, 10);

    const listUsers = [{
        name: 'Reza Fahlevi Alhady',
        gender: 'Pria',
        tempat_lahir: 'Jakarta',
        tanggal_lahir: '2002-01-26',
        umur: "25",
        tipe_pengurus: "RT"
      },
      {
        name: 'Brandon Nicholas Salim',
        gender: 'Pria',
        tempat_lahir: 'Jakarta',
        tanggal_lahir: '1999-03-03',
        umur: "27",
        tipe_pengurus: "Dasawisma"
      },
      {
        name: 'Gusti Rayhan Gibayus',
        gender: 'Pria',
        tempat_lahir: 'Jakarta',
        tanggal_lahir: '2000-04-15',
        umur: "28",
        tipe_pengurus: "Dasawisma"
      },
      {
        name: 'Vanesha Prescilla',
        gender: 'Wanita',
        tempat_lahir: 'Jakarta',
        tanggal_lahir: '1999-09-01',
        umur: "30",
        tipe_pengurus: "Dasawisma"
      },
      {
        name: 'Yoriko Angeline Agus Pebrianto',
        gender: 'Wanita',
        tempat_lahir: 'Jakarta',
        tanggal_lahir: '2000-09-20',
        umur: "27",
        tipe_pengurus: "Dasawisma"
      },
    ];

    const users = new Array(1);
    for (let i = 0; i < users.length; i++) {
      users[i] = i + 1;
    }

    const insertUser = [];
    listUsers.forEach((user) => {
      insertUser.push(
        ...users.map(() => {
          const splitName = user.name.split(' ');
          let splitWord = splitName[0] + splitName[splitName.length - 1];
          const randAlpha = getRandTwoDigits();
          const rand = Math.floor(Math.random() * 10);

          return ({
            nama: user.name,
            user_id: splitWord.toLowerCase(),
            password: encryptedPassword,
            tempat_lahir: user.tempat_lahir,
            tanggal_lahir: user.tanggal_lahir,
            tipe_pengurus: user.tipe_pengurus,
            foto_pengurus: `https://randomuser.me/api/portraits/lego/${rand}.jpg`,
            gender: user.gender,
            umur: user.umur,
            no_hp: `08${Math.random().toString().substring(5,15)}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        })
      )
    });

    await queryInterface.bulkInsert('Pengurus', insertUser, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pengurus', null, {});
  }
};