// File: app/api/posts/[id]/like/route.js

import connectDB from "../../../../../lib/dbConnect";
import Post from "../../../../../models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/authOptions";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response("Unauthorized", { status: 401 });
    }

    const url = new URL(req.url);
    const pathSegments = url.pathname.split("/");
    const id = pathSegments[pathSegments.length - 2]; // /api/posts/[id]/like

    await connectDB();

    const post = await Post.findById(id);
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    // Make sure likes is initialized
    if (!Array.isArray(post.likes)) {
      post.likes = [];
    }

    const userEmail = session.user.email;

    const likedIndex = post.likes.findIndex(
      (like) => like.userEmail === userEmail
    );

    if (likedIndex > -1) {
      // User already liked it — unlike
      post.likes.splice(likedIndex, 1);
    } else {
      // User has not liked yet — like
      post.likes.push({ userEmail });
    }

    await post.save();

    return new Response(
      JSON.stringify({
        success: true,
        liked: likedIndex === -1, // if it was NOT already liked
        totalLikes: post.likes.length,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Like Toggle Error:", error);
    return new Response("Failed to like/unlike post", { status: 500 });
  }
}
