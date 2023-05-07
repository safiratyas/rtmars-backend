'use strict';

/** @type {import('sequelize-cli').Migration} */

const {
  Op
} = require("sequelize");
const bcrypt = require("bcryptjs");

function getRandAlphabet() {
  const getRandInt = Math.floor(Math.random() * 26);
  return String.fromCharCode((getRandInt + 65).toString());
}

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
        name: 'Hwang In-youp',
        gender: 'Pria',
        tempat_lahir: 'Jakarta',
        tanggal_lahir: '2002-01-26',
        umur: "25",
      },
      {
        name: 'Cha Eun-Woo',
        gender: 'Pria',
        tempat_lahir: 'Jakarta',
        tanggal_lahir: '1999-03-03',
        umur: "27",
      },
      {
        name: 'Moon Ga-Young',
        gender: 'Wanita',
        tempat_lahir: 'Jakarta',
        tanggal_lahir: '2000-04-15',
        umur: "28",
      },
      {
        name: 'Park Yoo-Na',
        gender: 'Wanita',
        tempat_lahir: 'Jakarta',
        tanggal_lahir: '1999-09-01',
        umur: "30",
      },
      {
        name: 'Kang Min-Ah',
        gender: 'Wanita',
        tempat_lahir: 'Jakarta',
        tanggal_lahir: '2000-09-20',
        umur: "27",
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
          const getRandDigits = getRandAlphabet();
          const randAlpha = getRandTwoDigits();
          const rand = Math.floor(Math.random() * 10);

          return ({
            nama_lengkap: user.name,
            email: `${splitWord.toLowerCase()}@gmail.com`,
            password: encryptedPassword,
            alamat: `Jalan Manggarai Selatan ${getRandDigits} Blok ${randAlpha} Nomor ${getRandDigits}.`,
            jenis_kelamin: user.gender,
            umur: user.umur,
            no_nik: `31${Math.random().toString().substring(5,15)}`,
            no_kk: `31${Math.random().toString().substring(5,15)}`,
            tempat_lahir: user.tempat_lahir,
            tanggal_lahir: user.tanggal_lahir,
            id_agama: 1,
            id_pendidikan: 1,
            id_pekerjaan: 1,
            id_gol_darah: 1,
            id_pengurus: 1,
            foto_warga: `https://randomuser.me/api/portraits/lego/${rand}.jpg`,
            foto_kk: "",
            foto_ktp: "",
            kewarganegaraan: "",
            no_hp: `08${Math.random().toString().substring(5,15)}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        })
      )
    });

    await queryInterface.bulkInsert('Wargas', insertUser, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Wargas', null, {});
  }
};