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

    const listUsers = [
      {
        name: 'Sapari Agustus',
        gender: 'Pria',
        tempat_lahir: 'Jakarta',
        tanggal_lahir: '1967-08-07',
        umur: "55",
        tipe_pengurus: "RT",
        no_ktp: 312120121020,
        rt: 10,
        rw: 10,
        kelurahan: "Manggarai",
        kecamatan: "Tebet",
        kota_kabupaten: "Jakarta Selatan"
      },
      {
        name: 'Ricky Noviansyah',
        gender: 'Pria',
        tempat_lahir: 'Jakarta',
        tanggal_lahir: '1983-01-26',
        umur: "39",
        tipe_pengurus: "Dasawisma",
        no_ktp: 312120176020,
        rt: 10,
        rw: 10,
        kelurahan: "Manggarai",
        kecamatan: "Tebet",
        kota_kabupaten: "Jakarta Selatan",
        nama_kelompok_dasawisma: "KELAPA 010.010.002"
      },
      {
        name: 'Ismiaroh',
        gender: 'Wanita',
        tempat_lahir: 'Jakarta',
        tanggal_lahir: '1976-09-08',
        umur: "46",
        tipe_pengurus: "Dasawisma",
        no_ktp: 312175121020,
        rt: 10,
        rw: 10,
        kelurahan: "Manggarai",
        kecamatan: "Tebet",
        kota_kabupaten: "Jakarta Selatan",
        nama_kelompok_dasawisma: "KELAPA 010.010.001"
      },
      {
        name: 'Yulina',
        gender: 'Wanita',
        tempat_lahir: 'Jakarta',
        tanggal_lahir: '1977-09-01',
        umur: "30",
        tipe_pengurus: "Dasawisma",
        no_ktp: 312120091020,
        rt: 10,
        rw: 10,
        kelurahan: "Manggarai",
        kecamatan: "Tebet",
        kota_kabupaten: "Jakarta Selatan",
        nama_kelompok_dasawisma: "KELAPA 010.010.003"
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
            nama_lengkap: user.name,
            user_id: splitWord.toLowerCase(),
            password: encryptedPassword,
            no_ktp: user.no_ktp,
            rt: user.rt,
            rw: user.rw,
            kelurahan: user.kelurahan,
            kecamatan: user.kecamatan,
            kota_kabupaten: user.kota_kabupaten,
            nama_kelompok_dasawisma: user.nama_kelompok_dasawisma,
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