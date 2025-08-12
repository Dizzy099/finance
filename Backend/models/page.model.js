import mongoose from "mongoose";

// Page Schema
const pageSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
    },
  }, { timestamps: true });
  
  export const Page = mongoose.model("Page", pageSchema);
  