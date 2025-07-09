

import { getServerSession } from "next-auth";
import { authOptions } from "../../../../app/api/auth/[...nextauth]/route";
import dbConnect from "../../../../lib/dbConnect";
import Post from "../../../../models/Post";
import User from "../../../../models/User"; // ✅ Add User model
import mongoose from "mongoose";

// ✅ GET (Single post)
export async function GET(req, context) {
  const { id } = await context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
  }

  await dbConnect();

  try {
    const post = await Post.findById(id);
    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ post }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch post" }), { status: 500 });
  }
}

// ✅ PUT (Update post)
export async function PUT(req, context) {
  const { id } = await context.params;
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
  }

  await dbConnect();

  try {
    const { title, content, image } = await req.json();

    // ✅ Get the user._id using session user email
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const updatedPost = await Post.findOneAndUpdate(
      { _id: id, user: user._id },
      { title, content, image },
      { new: true }
    );

    if (!updatedPost) {
      return new Response(JSON.stringify({ error: "Unauthorized or Post not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, post: updatedPost }), { status: 200 });
  } catch (err) {
    console.error("PUT error:", err);
    return new Response(JSON.stringify({ error: "Update failed" }), { status: 500 });
  }
}

// ✅ DELETE (Delete post)
export async function DELETE(req, context) {
  const { id } = await context.params;
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
  }

  await dbConnect();

  try {
    // ✅ Get user._id from email
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const deletedPost = await Post.findOneAndDelete({
      _id: id,
      user: user._id,
    });

    if (!deletedPost) {
      return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Post deleted" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Delete failed" }), { status: 500 });
  }
}
