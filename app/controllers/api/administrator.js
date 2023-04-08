const administrator_service = require("../../services/administrator")
const {
  checkPassword,
  createToken
} = require("../../plugins")

module.exports = {
  async login(req, res) {
    try {
      const email = req.body.email.toLowerCase();
      const password = req.body.password;

      const admin = await administrator_service.getOne({
        where: {
          email
        },
      });

      if (!admin) {
        res.status(404).json({
          status: "Failed",
          message: "Email tidak ditemukan!"
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
        name: admin.name,
        email: admin.email
      }, process.env.JWT_PRIVATE_KEY || "Token", {
        expiresIn: "2d"
      });

      res.status(201).json({
        id: admin.id,
        name: admin.name,
        email: admin.email,
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
    try {
      res.status(200).json();
    } catch (err) {
      res.status(404).json({
        status: 'Failed',
        message: err.message,
      });
    }
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
}