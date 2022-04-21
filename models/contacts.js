import mongoose from "mongoose";

const contactsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: [40, "Title must be less than 40 characters"],
    },
    email: {
      type: String,
      required: true,
      maxlength: 20,
    },
    Questions: {
      type: String,
      required: true,
      maxlength: [200, "Description must be less than 200 characters"],
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.models.contacts ||
  mongoose.model("contacts", contactsSchema);
