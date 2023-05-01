const religion_service = require("../../services/religion");

module.exports = {
  async getReligion(req, res) {
    try {
      const religion = await religion_service.getOne({
        where: {
          id: req.params.id
        },
      });

      if (!religion) {
        throw new Error(`Agama dengan ID ${req.params.id} tidak ditemukan!`);
      }

      res.status(200).json(religion);
    } catch (err) {
      res.status(404).json({
        status: 'Failed',
        message: err.message,
      });
    }
  },

  async getAllReligions(req, res) {
    const getAll = await religion_service.list();

    res.status(200).json({
      status: 'Success',
      data: getAll
    });
  },

  async deleteReligion(req, res) {
    try {
      const id = req.params.id;
      const religion = await religion_service.getOne({
        where: {
          id,
        }
      });

      if (!religion) {
        res.status(404).json({
          status: 'Failed',
          message: `Agama dengan ID ${id} tidak ditemukan!`,
        });
        return;
      }

      const destroy = await religion_service.delete(id);
      res.status(200).json({
        status: 'OK',
        message: `Agama dengan ID ${id} berhasil dihapus`,
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