const job_service = require("../../services/job");

module.exports = {
  async getJob(req, res) {
    try {
      const job = await job_service.getOne({
        where: {
          id: req.params.id
        },
      });

      if (!job) {
        throw new Error(`Pekerjaan dengan ID ${req.params.id} tidak ditemukan!`);
      }

      res.status(200).json(job);
    } catch (err) {
      res.status(404).json({
        status: 'Failed',
        message: err.message,
      });
    }
  },

  async getAllJobs(req, res) {
    const getAll = await job_service.list();

    res.status(200).json({
      status: 'Success',
      data: getAll
    });
  },

  async deleteJob(req, res) {
    try {
      const id = req.params.id;
      const job = await job_service.getOne({
        where: {
          id,
        }
      });

      if (!job) {
        res.status(404).json({
          status: 'Failed',
          message: `Pekerjaan dengan ID ${id} tidak ditemukan!`,
        });
        return;
      }

      const destroy = await job_service.delete(id);
      res.status(200).json({
        status: 'OK',
        message: `Pekerjaan dengan ID ${id} berhasil dihapus`,
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