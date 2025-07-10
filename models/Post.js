

// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    imageUrl: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ✅ Comments section (optional if you already added elsewhere)
    comments: [
      {
        userEmail: { type: String, required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        user: {
          id: { type: String },
          name: { type: String },
          image: { type: String },
        },
      },
    ],

    // ✅ Likes based on user email
    likes: [
      {
        userEmail: { type: String, required: true },
      },
    ],

    // Optional: count for comments
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
