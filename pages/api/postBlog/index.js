import dbConnect from "util/mongo";
import postBlog from "models/postBlog";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        const posts = await postBlog.find();
        return res.status(200).json(posts);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    case "POST":
      try {
        const newpostBlog = new postBlog(body);
        const savedpostBlog = await newpostBlog.save();
        return res.status(201).json(savedpostBlog);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}
