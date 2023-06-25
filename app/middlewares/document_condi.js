const document_service = require("../services/document")

module.exports = {
  async checkCondition(req, res, next) {
    const {
      tanggal_pengajuan,
      jenis_dokumen,
      keterangan,
    } = req.body;

    if (!tanggal_pengajuan) {
      res.status(400).json({
        status: "Failed",
        message: "Tanggal Pengajuan Harus Diisi!"
      })
      return;
    }

    if (!jenis_dokumen) {
      res.status(400).json({
        status: "Failed",
        message: "Jenis Dokumen Harus Diisi!"
      })
      return;
    }

    if (!keterangan) {
      res.status(400).json({
        status: "Failed",
        message: "Keterangan Harus Diisi!"
      })
      return;
    }

    const uniqueDocument = await document_service.getOne({
      where: {
        jenis_dokumen
      }
    });

    if (uniqueDocument) {
      res.status(400).json({
        status: 'Failed',
        message: 'Jenis Dokumen Sudah Diinput!'
      });
      return;
    }

    next();
  }
}