

import connectDB from "../../../../lib/dbConnect";
import Post from "../../../../models/Post";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  const { id } = params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ error: "Invalid user ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await connectDB();

    const posts = await Post.find({ user: new mongoose.Types.ObjectId(id) }).sort({ createdAt: -1 });

    return new Response(JSON.stringify({ posts }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API ERROR:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
