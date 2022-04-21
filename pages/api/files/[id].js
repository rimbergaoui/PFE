import dbConnect from "util/mongo";
import postBlog from "models/file";

dbConnect();

export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const post = await postBlog.findById(id);
        if (!post) return res.status(404).json({ msg: "Blog not found" });
        return res.status(200).json(post);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    case "PUT":
      try {
        const blogUpdate = await postBlog.findByIdAndUpdate(id, body, {
          new: true,
        });
        if (!blogUpdate)
          return res.status(404).json({ msg: "Article not found" });
        return res.status(200).json(postBlog);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    case "DELETE":
      try {
        const deletepost = await postBlog.findByIdAndDelete(id);
        if (!deletepost) return res.status(404).json({ msg: "Blog not found" });
        return res.status(204).json();
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};
