const citizen_service = require("../../services/citizen")
const {
  checkPassword,
  createToken
} = require("../../plugins")

module.exports = {
  async login(req, res) {
    try {
      const email = req.body.email.toLowerCase();
      const password = req.body.password;

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
        throw new Error(`Pengurus dengan ID ${req.params.id} tidak ditemukan!`);
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