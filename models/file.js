import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
});

export default mongoose.models.File || mongoose.model("File", FileSchema);
