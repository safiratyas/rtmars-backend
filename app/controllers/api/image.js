const cloudinary = require("../../../config/cloudinary");

module.exports = {
  uploadPhoto(req, res) {
    if (req.citizen.id.toString() !== req.params.id.toString()) {
      res.status(401).json({
        status: "Unauthorized",
        message: `${req.citizen.nama_lengkap} hanya bisa mengupload fotonya sendiri!`
      });
      return;
    }

    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    console.log(fileBase64 + " lewat sini")

    cloudinary.uploader.upload(file, function (err, result) {
      if (!!err) {
        return res.status(400).json({
          error: err,
          message: "Gagal upload file!",
        });
      }
      console.log(result)
      res.status(201).json({
        message: "Upload image berhasil",
        url: result.url,
      });
    });
  },

  uploadPhotoCitizen(req, res) {
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    cloudinary.uploader.upload(file, function (err, result) {
      if (!!err) {
        return res.status(400).json({
          error: err,
          message: "Gagal upload file!",
        });
      }
      console.log(result)
      res.status(201).json({
        message: "Upload image berhasil",
        url: result.url,
      });
    });
  },
}