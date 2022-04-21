import File from "models/file";
import dbConnect from "util/mongo";

export const config = {
  api: {
    bodyParser: false,
  },
};

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const files = await File.find();
        return res.status(200).json(files);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    case "POST":
      try {
        const newFile = new File(body);
        const savedFile = await newFile.save();
        return res.status(201).json(savedFile);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}
