import mongoose from "mongoose";

const postBlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: [40, "Title must be less than 40 characters"],
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: [200, "Description must be less than 200 characters"],
    },
    categorie: {
      type: String,
      required: true,
      maxlength: [200, "Description must be less than 200 characters"],
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.models.postBlog ||
  mongoose.model("postBlog", postBlogSchema);
