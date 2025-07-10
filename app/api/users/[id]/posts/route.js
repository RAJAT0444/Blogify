


import connectDB from "../../../../../lib/dbConnect";
import Post from "../../../../../models/Post";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  const { id } = params;

  console.log("🔍 Incoming GET request for posts by user ID:", id);

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    console.error("❌ Invalid or missing user ID:", id);
    return new Response(
      JSON.stringify({ success: false, error: "Valid user ID is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    const posts = await Post.find({ user: new mongoose.Types.ObjectId(id) })
      .sort({ createdAt: -1 })
      .populate("user", "name email _id");

    console.log(`📦 Found ${posts.length} posts for user: ${id}`);

    return new Response(
      JSON.stringify({ success: true, posts }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("🔥 Error in /api/users/[id]/posts:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal Server Error",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
