const administrator_service = require("../../services/administrator")
const citizen_service = require("../../services/citizen");
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
}