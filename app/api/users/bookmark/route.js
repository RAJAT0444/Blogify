

// app/api/users/bookmark/route.js

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "../../../../lib/dbConnect";
import User from "../../../../models/User";
import Post from "../../../../models/Post";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return new Response("Unauthorized", { status: 401 });

  try {
    await connectDB();
    const user = await User.findOne({ email: session.user.email }).populate("bookmarks");

    if (!user) return new Response("User not found", { status: 404 });

    return new Response(JSON.stringify(user.bookmarks), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return new Response("Unauthorized", { status: 401 });

  try {
    await connectDB();
    const body = await req.json();
    const { postId } = body;

    if (!postId) return new Response("Missing postId", { status: 400 });

    const user = await User.findOne({ email: session.user.email });
    const post = await Post.findById(postId);

    if (!user || !post) {
      return new Response("User or Post not found", { status: 404 });
    }

    // Check if already bookmarked
    const alreadyBookmarked = user.bookmarks.includes(postId);
    if (alreadyBookmarked) {
      return new Response("Already bookmarked", { status: 409 });
    }

    user.bookmarks.push(postId);
    await user.save();

    return new Response(JSON.stringify({ message: "Bookmarked successfully" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Bookmark POST error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
