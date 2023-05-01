const education_service = require("../../services/education");

module.exports = {
  async getEducation(req, res) {
    try {
      const education = await education_service.getOne({
        where: {
          id: req.params.id
        },
      });

      if (!education) {
        throw new Error(`Pendidikan dengan ID ${req.params.id} tidak ditemukan!`);
      }

      res.status(200).json(education);
    } catch (err) {
      res.status(404).json({
        status: 'Failed',
        message: err.message,
      });
    }
  },

  async getAllEducations(req, res) {
    const getAll = await education_service.list();

    res.status(200).json({
      status: 'Success',
      data: getAll
    });
  },

  async deleteEducation(req, res) {
    try {
      const id = req.params.id;
      const education = await education_service.getOne({
        where: {
          id,
        }
      });

      if (!education) {
        res.status(404).json({
          status: 'Failed',
          message: `Pendidikan dengan ID ${id} tidak ditemukan!`,
        });
        return;
      }

      const destroy = await education_service.delete(id);
      res.status(200).json({
        status: 'OK',
        message: `Pendidikan dengan ID ${id} berhasil dihapus`,
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