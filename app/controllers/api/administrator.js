const administrator_service = require("../../services/administrator");
const citizen_service = require("../../services/citizen");
const report_service = require("../../services/report");
const getCurrentMonth = require("../../utils/getCurrentMonth");
const {
  checkPassword,
  createToken
} = require("../../plugins")

module.exports = {
  async login(req, res) {
    try {
      const user_id = req.body.user_id.toLowerCase();
      const password = req.body.password;

      const admin = await administrator_service.getOne({
        where: {
          user_id
        },
      });

      if (!admin) {
        res.status(404).json({
          status: "Failed",
          message: "User ID tidak ditemukan!"
        });
        return;
      }

      const isPasswordCorrect = await checkPassword(password, admin.password);

      if (!isPasswordCorrect) {
        res.status(401).json({
          status: "Failed",
          message: "Password Salah!"
        });
        return;
      }

      const token = createToken({
        id: admin.id,
        nama_lengkap: admin.nama_lengkap,
        user_id: admin.user_id
      }, process.env.JWT_PRIVATE_KEY || "Token", {
        expiresIn: "2d"
      });

      res.status(201).json({
        id: admin.id,
        nama_lengkap: admin.nama_lengkap,
        user_id: admin.user_id,
        token,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      });

    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message
      });
    }
  },

  async whoAmI(req, res) {
    res.status(200).json(req.admin);
  },

  async getAdmin(req, res) {
    try {
      const admin = await administrator_service.getOne({
        where: {
          id: req.params.id
        },
        attributes: {
          exclude: ['password']
        }
      });

      if (!admin) {
        throw new Error(`Pengurus dengan ID ${req.params.id} tidak ditemukan!`);
      }

      res.status(200).json(admin);
    } catch (err) {
      res.status(404).json({
        status: 'Failed',
        message: err.message,
      });
    }
  },

  async getAllAdmins(req, res) {
    const getAll = await administrator_service.list({
      attributes: {
        exclude: ['password']
      }
    });

    res.status(200).json({
      status: 'Success',
      data: getAll
    });
  },

  async createCitizen(req, res) {
    try {
      const {
        nama_lengkap,
        alamat,
        jenis_kelamin,
        tempat_lahir,
        tanggal_lahir,
        id_agama,
        id_pendidikan,
        id_pekerjaan,
        kewarganegaraan,
        foto_kk,
        // foto_ktp,
        no_nik,
        no_kk
      } = req.body;

      const createData = await citizen_service.create({
        nama_lengkap,
        alamat,
        jenis_kelamin,
        tempat_lahir,
        tanggal_lahir,
        id_agama,
        id_pendidikan,
        id_pekerjaan,
        kewarganegaraan,
        foto_kk,
        // foto_ktp,
        no_nik,
        no_kk
      });

      res.status(200).json({
        status: 'OK',
        message: `Warga telah berhasil diinput.`,
        // data: createData
      });
    } catch (err) {
      res.status(422).json({
        status: 'Failed',
        message: err.message,
      });
    }
  },

  async createCitizenReport(req, res) {
    try {
      const {
        jumlah_rumah,
        jumlah_keluarga,
        jumlah_warga,
        jumlah_bayi,
        jumlah_meninggal,
        jumlah_pindahan,
        kegiatan_pancasila,
        kegiatan_gotong_royong,
        kegiatan_pangan,
        kegiatan_sandang,
        kegiatan_tata_laksana,
        kegiatan_pendidikan_terampil,
        kegiatan_kesehatan,
        kegiatan_pengembangan_koperasi,
        kegiatan_kelestarian,
        kegiatan_perencanaan_sehat,
      } = req.body;

      const currentDay = new Date();
      const currentMonth = currentDay.getMonth();
      const currentYear = currentDay.getFullYear();

      const createData = await report_service.create({
        jumlah_rumah,
        jumlah_keluarga,
        jumlah_warga,
        jumlah_bayi,
        jumlah_meninggal,
        jumlah_pindahan,
        kegiatan_pancasila,
        kegiatan_gotong_royong,
        kegiatan_pangan,
        kegiatan_sandang,
        kegiatan_tata_laksana,
        kegiatan_pendidikan_terampil,
        kegiatan_kesehatan,
        kegiatan_pengembangan_koperasi,
        kegiatan_kelestarian,
        kegiatan_perencanaan_sehat,
        bulan: getCurrentMonth(currentMonth),
        tahun: currentYear,
        id_pengurus: req.admin.id
      });

      res.status(200).json({
        status: 'OK',
        message: "Pendataan Warga telah berhasil diinput.",
      });
    } catch (err) {
      res.status(422).json({
        status: 'Failed',
        message: err.message,
      });
    }
  },


  async getAllReports(req, res) {
    const getAll = await report_service.list();

    res.status(200).json({
      status: 'Success',
      data: getAll
    });
  },

  async deleteReport(req, res) {
    try {
      const id = req.params.id;
      const report = await report_service.getOne({
        where: {
          id,
        }
      });

      if (!report) {
        res.status(404).json({
          status: 'Failed',
          message: `Laporan dengan ID ${id} tidak ditemukan!`,
        });
        return;
      }

      const compareId = req.admin.id === report.id_pengurus;

      if (!compareId) {
        res.status(404).json({
          status: 'Unauthorized',
          message: 'Pengurus hanya bisa menghapus data dia sendiri!'
        });
        return;
      }

      const destroy = await report_service.delete(id);
      res.status(200).json({
        status: 'OK',
        message: `Laporan Warga dengan ID ${id} berhasil dihapus`,
      });

    } catch (err) {
      res.status(400).json({
        error: {
          name: err.name,
          message: err.message,
        }
      });
    }
  },
}