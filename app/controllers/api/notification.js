const document_service = require('../../services/document');
const citizen_service = require('../../services/citizen');
const agenda_service = require('../../services/agenda');
const timeFormat = require("../../utils/timeFormat");
const sortTimeDecendingly = require("../../utils/sortTimeDecendingly");
const {
  Warga
} = require('../../models');
const {
  Op
} = require("sequelize");

module.exports = {
  async getAllNotification(req, res) {
    try {
      const getEvent = await agenda_service.list();

      const getDocument = await document_service.list({
        include: {
          model: Warga,
          as: 'warga',
        },
        order: [
          ["id", "DESC"]
        ]
      });

      const results = [].concat(
        getEvent.data.map((event) => {
          console.log(event)
          return ({
            information: "Terdapat Agenda Terbaru",
            event
          });
        }),
        getDocument.data.map((document) => {
          console.log(document)
          return ({
            information: "Request Surat Kepengurusan Baru",
            document
          });
        }),
      );

      const messages = results.map((notification) => {
        let show;
        if (notification.information == "Terdapat Agenda Terbaru") {
          show = notification.event
          return ({
            msg: 'Terdapat Agenda Baru',
            id: show.id,
            // name: show.warga.nama_lengkap,
            // NIK: show.warga.no_nik,
            jenis: show.jenis_kegiatan,
            keterangan: show.keterangan,
            foto_kegiatan: show.foto_kegiatan,
            tanggal: timeFormat(show.createdAt)
          })
        } else if (notification.information == "Request Surat Kepengurusan Baru") {
          show = notification.document
          return ({
            msg: 'Request Surat Kepengurusan Baru',
            id: show.id,
            wargaID: show.id_warga,
            // name: show.warga.nama_lengkap,
            // NIK: show.warga.no_nik,
            jenis: show.jenis_dokumen,
            keterangan: show.keterangan,
            tanggal: timeFormat(show.tanggal_pengajuan)
          })
        }
      });

      const sortedMsg = sortTimeDecendingly(messages);

      res.status(200).json({
        status: "Success",
        data: sortedMsg
      });
    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message
      });
    }
  },

  async getNotificationCitizen(req, res) {
    try {
      const getEvent = await agenda_service.list();

      const agendaCitizen = getEvent.data.map((event) => {
        console.log(event)
        return ({
          information: `Terdapat Agenda Baru ${event.jenis_kegiatan}`,
          event
        });
      })

      const messages = agendaCitizen.map((notification) => {
        let show;
        show = notification.event
        return ({
          msg: 'Terdapat Agenda Baru',
          id: show.id,
          // name: show.warga.nama_lengkap,
          // NIK: show.warga.no_nik,
          jenis_kegiatan: show.jenis_kegiatan,
          keterangan: show.keterangan,
          foto_kegiatan: show.foto_kegiatan,
          tanggal_kegiatan: timeFormat(show.createdAt)
        })
      });

      const sortedMResult = sortTimeDecendingly(messages);

      res.status(200).json({
        status: "success",
        data: sortedMResult
      });

    } catch (err) {
      res.status(400).json({
        status: "Failed",
        message: err.message
      });
    }
  }
};