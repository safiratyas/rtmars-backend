const agenda_service = require("../../services/agenda");

module.exports = {
  async createAgenda(req, res) {
    try {
     const agenda = await agenda_service.create({
        jenis_kegiatan: req.body.jenis_kegiatan,
        keterangan: req.body.keterangan,
        foto_kegiatan: req.body.foto_kegiatan,
      });

      res.status(201).json({
        id: agenda.id,
        jenis_kegiatan: agenda.jenis_kegiatan,
        keterangan: agenda.keterangan,
        foto_kegiatan: req.body.foto_kegiatan,
        createdAt: agenda.createdAt,
        updatedAt: agenda.updatedAt
      })
    } catch (err) {
      res.status(400).json({
        status: 'Failed',
        message: err.message
      });
    }
  },

  async getAllAgenda(req, res) {
    const getAll = await agenda_service.list();

    res.status(200).json({
      status: 'Success',
      data: getAll
    });
  },
}