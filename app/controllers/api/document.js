const document_service = require("../../services/document");
const citizen_service = require("../../services/citizen");
const {
  Op
} = require("sequelize");

module.exports = {
  async createDocument(req, res) {
    try {
      const getListCitizen = await citizen_service.get(req.params.id, {
        include: {
          model: Warga,
          as: 'warga',
        },
      });

      console.log(getListCitizen)

     const document = await document_service.create({
        tanggal_pengajuan: req.body.tanggal_pengajuan,
        jenis_dokumen: req.body.jenis_dokumen,
        keterangan: req.body.keterangan,
      });

      console.log(document)

      res.status(201).json({
        id: document.id,
        nama_lengkap: getListCitizen.nama_lengkap,
        no_kk: getListCitizen.no_kk,
        no_nik: getListCitizen.no_nik,
        tanggal_pengajuan: document.tanggal_pengajuan,
        jenis_dokumen: document.jenis_dokumen,
        keterangan: document.keterangan,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt
      })
    } catch (err) {
      res.status(400).json({
        status: 'Failed',
        message: err.message
      });
    }
  },
}