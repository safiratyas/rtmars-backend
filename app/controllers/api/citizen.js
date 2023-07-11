const citizen_service = require("../../services/citizen")
const {
  checkPassword,
  createToken,
  hashPassword
} = require("../../plugins")

module.exports = {
  async register(req, res) {
    try {
      const password = req.body.password;
      const encryptedPassword = await hashPassword(password, 10);

      const citizen = await citizen_service.create({
        nama_lengkap: req.body.nama_lengkap,
        email: req.body.email.toLowerCase(),
        password: encryptedPassword,
      });

      console.log(citizen)

      res.status(201).json({
        id: citizen.id,
        nama_lengkap: citizen.nama_lengkap,
        email: citizen.email,
        createdAt: citizen.createdAt,
        updatedAt: citizen.updatedAt
      })
    } catch (err) {
      res.status(400).json({
        status: 'Failed',
        message: err.message
      });
    }
  },

  async login(req, res) {
    try {
      const email = req.body.email.toLowerCase();
      const password = req.body.password;

      console.log(password)
      const citizen = await citizen_service.getOne({
        where: {
          email
        },
      });

      if (!citizen) {
        res.status(404).json({
          status: "Failed",
          message: "Email tidak ditemukan!"
        });
        return;
      }

      const isPasswordCorrect = await checkPassword(password, citizen.password);

      if (!isPasswordCorrect) {
        res.status(401).json({
          status: "Failed",
          message: "Password Salah!"
        });
        return;
      }

      const token = createToken({
        id: citizen.id,
        name: citizen.name,
        email: citizen.email
      }, process.env.JWT_PRIVATE_KEY || "Token", {
        expiresIn: "2d"
      });

      res.status(201).json({
        id: citizen.id,
        name: citizen.name,
        email: citizen.email,
        token,
        createdAt: citizen.createdAt,
        updatedAt: citizen.updatedAt,
      });

    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message
      });
    }
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

  async deleteCitizen(req, res) {
    try {
      const id = req.params.id;
      const citizen = await citizen_service.getOne({
        where: {
          id,
        }
      });

      if (!citizen) {
        res.status(404).json({
          status: 'Failed',
          message: `Warga dengan ID ${id} tidak ditemukan!`,
        });
        return;
      }

      const compareId = req.citizen.id === citizen.id;

      if (!compareId) {
        res.status(404).json({
          status: 'Unauthorized',
          message: 'Warga hanya bisa menghapus data dia sendiri!'
        });
        return;
      }

      const destroy = await citizen_service.delete(id);
      res.status(200).json({
        status: 'OK',
        message: `Warga dengan ID ${id} berhasil dihapus`,
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

  async updateProfile(req, res) {
    try {
      const {
        jenis_kelamin,
        tempat_lahir,
        tanggal_lahir,
        alamat,
        umur,
        no_hp,
        no_kk,
        no_nik,
        foto_warga,
        // foto_kk,
        // foto_ktp,
      } = req.body;

      const id = req.params.id;
      const compareId = id.toString() === req.citizen.id.toString();

      if (!compareId) {
        res.status(401).json({
          status: 'Failed',
          message: 'Warga hanya bisa edit data sesuai dengan ID pasien tersebut.'
        });
        return;
      }

      const updateData = await citizen_service.update(req.params.id, {
        jenis_kelamin,
        alamat,
        tempat_lahir,
        tanggal_lahir: timeFormat(tanggal_lahir),
        umur,
        no_kk,
        no_nik,
        foto_warga,
        no_hp
        // foto_kk,
        // foto_ktp,
      });

      res.status(200).json({
        status: 'OK',
        message: `Warga dengan ID ${req.params.id} telah berhasil diperbarui.`
      });
    } catch (err) {
      res.status(422).json({
        status: 'Failed',
        message: err.message,
      });
    }
  },

  async whoAmI(req, res) {
    res.status(200).json(req.citizen);
  },

  async getCitizen(req, res) {
    try {
      const citizen = await citizen_service.getOne({
        where: {
          id: req.params.id
        },
        attributes: {
          exclude: ['password']
        }
      });

      if (!citizen) {
        throw new Error(`Warga dengan ID ${req.params.id} tidak ditemukan!`);
      }

      const compareId = req.citizen.id === citizen.id;
      console.log(compareId)

      if (!compareId) {
        res.status(401).json({
          status: 'Unauthorized',
          message: 'Warga hanya bisa melihat data dia sendiri!'
        });
        return;
      }

      res.status(200).json(citizen);
    } catch (err) {
      res.status(404).json({
        status: 'Failed',
        message: err.message,
      });
    }
  },

  async getAllCitizens(req, res) {
    const getAll = await citizen_service.list({
      attributes: {
        exclude: ['password']
      }
    });

    res.status(200).json({
      status: 'Success',
      data: getAll
    });
  },
}