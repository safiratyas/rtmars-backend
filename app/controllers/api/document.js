// const Warga = require("../../models")
// const {
//   Op
// } = require("sequelize");
// const citizen_service = require("../../services/citizen");
const document_service = require("../../services/document");

module.exports = {
  async createDocument(req, res) {
    try {
      // const getListCitizen = await citizen_service.get(req.params.id, {
      //   include: {
      //     model: Warga,
      //     as: 'warga',
      //   },
      // });

      // console.log(getListCitizen + "cekkkkkkkkkkkkkkkkkkkkkk")

     const document = await document_service.create({
        tanggal_pengajuan: req.body.tanggal_pengajuan,
        jenis_dokumen: req.body.jenis_dokumen,
        keterangan: req.body.keterangan,
        id_warga: req.citizen.id
      });

      console.log(document)

      res.status(201).json({
        id: document.id,
        id_warga: req.citizen.id,
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

  async getAllDocuments(req, res) {
    const getAll = await document_service.list();

    res.status(200).json({
      status: 'Success',
      data: getAll
    });
  },

  async getDocument(req, res) {
    try {
      const document = await document_service.list({
        where: {
          id_warga: req.params.id
        },
        order: [
          ['id', 'DESC'],
      ],
      });

      if (!document) {
        throw new Error(`Dokumen Warga dengan ID ${req.params.id} tidak ditemukan!`);
      }

      const compareId = req.citizen.id === document.id_warga;
      console.log(req.citizen.id)

      if (!compareId) {
        res.status(401).json({
          status: 'Unauthorized',
          message: 'Warga hanya bisa melihat data dia sendiri!'
        });
        return;
      }

      res.status(200).json(document);
    } catch (err) {
      res.status(404).json({
        status: 'Failed',
        message: err.message,
      });
    }
  },
}