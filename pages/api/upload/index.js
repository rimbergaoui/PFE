import { IncomingForm } from "formidable";
import { promises as fs } from "fs";
var mv = require("mv");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  //Add parameter for path

  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, images) => {
      if (err) return reject(err);
      console.log(fields, images);
      console.log(images.file.filepath);
      var oldPath = images.file.filepath;
      var newPath = `./public/img/uploads/${images.file.originalFilename}`;
      mv(oldPath, newPath, function (err) {});

      res.status(200).json({ fields, images });
    });
  });
};
