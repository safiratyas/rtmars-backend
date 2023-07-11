const document_service = require('../../services/document');
const timeFormat = require("../../utils/timeFormat");
const {
  Warga
} = require('../../models');
const {
  Op
} = require("sequelize");

module.exports = {
  async getAllNotification(req, res) {
    try {
      const getDocument = await document_service.list({
        // where: {
        //   isDone: {
        //     [Op.or]: [true, false]
        //   }
        // },
        include: {
          model: Warga,
          as: 'warga',
        },
        order: [
          ["id", "DESC"]
        ]
      });

      console.log(getDocument)

      // const result = getDocument.data.map((notification) => {
      //     return ({
      //       msg: 'Request Surat Kepengurusan Baru',
      //       id: notification.id,
      //       wargaID: notification.warga.id_warga,
      //       name: notification.warga.nama_lengkap,
      //       NIK: notification.warga.no_nik,
      //       jenis_dokumen: notification.jenis_dokumen,
      //       keterangan: notification.keterangan,
      //       tanggal_pengajuan: timeFormat(notification.tanggal_pengajuan)
      //     })
      // });

      res.status(200).json({
        status: "Success",
        result
      });
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message
      });
    }
  },
};