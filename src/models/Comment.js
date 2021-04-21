import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  avatarUrl: String,
  modifyFlag: {
    type: Boolean,
    default: false,
  },
});

const model = mongoose.model("Comment", CommentSchema);

export default model;
