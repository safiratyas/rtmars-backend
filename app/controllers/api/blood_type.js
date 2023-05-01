const blood_service = require("../../services/blood_type");

module.exports = {
  async getBloodType(req, res) {
    try {
      const blood = await blood_service.getOne({
        where: {
          id: req.params.id
        },
      });

      if (!blood) {
        throw new Error(`Golongan Darah dengan ID ${req.params.id} tidak ditemukan!`);
      }

      res.status(200).json(blood);
    } catch (err) {
      res.status(404).json({
        status: 'Failed',
        message: err.message,
      });
    }
  },

  async getAllBloods(req, res) {
    const getAll = await blood_service.list();

    res.status(200).json({
      status: 'Success',
      data: getAll
    });
  },

  async deleteBloodType(req, res) {
    try {
      const id = req.params.id;
      const blood = await blood_service.getOne({
        where: {
          id,
        }
      });

      if (!blood) {
        res.status(404).json({
          status: 'Failed',
          message: `Golongan Darah dengan ID ${id} tidak ditemukan!`,
        });
        return;
      }

      const destroy = await blood_service.delete(id);
      res.status(200).json({
        status: 'OK',
        message: `Golongan Darah dengan ID ${id} berhasil dihapus`,
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