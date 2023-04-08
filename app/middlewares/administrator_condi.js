const administrator_service = require("../services/administrator")

module.exports = {
  async checkCondition(req, res, next) {
    const {
      email,
      password
    } = req.body;

    if(!email) {
      res.status(400).json({
        status: "Failed",
        message: "Email Harus Diisi!"
      })
      return;
    }

    const filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;

    if (email == '' || email.search(filter) == -1) {
      res.status(400).json({
        status: 'Failed',
        message: 'Format Penulisan Email Salah!'
      });
      return;
    }

    const uniqueEmail = await administrator_service.getOne({
      where: {
        email
      }
    });

    if (uniqueEmail) {
      res.status(400).json({
        status: 'Failed',
        message: 'Email sudah terdaftar!'
      });
      return;
    }

    if (!password) {
      res.status(400).json({
        status: 'Failed',
        message: 'Password tidak boleh kosong!'
      });
      return;
    }
    
    if (password.length < 8) {
      res.status(400).json({
        status: 'Failed',
        message: 'Password harus lebih dari 7 karakter!'
      });
      return;
    }

    next();
  }
}