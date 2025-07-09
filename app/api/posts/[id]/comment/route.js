

import connectDB from "../../../../../lib/dbConnect";
import Post from "../../../../../models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/authOptions";

export async function POST(req) {
  try {
    // Extract ID from URL path
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 2]; // [id] is second last segment

    const { content } = await req.json();

    if (!id || !content) {
      return new Response("Post ID and content required", { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response("Unauthorized", { status: 401 });
    }

    await connectDB();

    const post = await Post.findById(id);
    if (!post) return new Response("Post not found", { status: 404 });

    // Add new comment with user email
    post.comments.push({
      userEmail: session.user.email,
      content,
      createdAt: new Date(),
      user: {
        id: session.user.id,
        name: session.user.name,
        image: session.user.image
      }
    });

    post.commentCount = post.comments.length;
    await post.save();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("❌ Comment Save Error:", error);
    return new Response("Failed to add comment", { status: 500 });
  }
}

export async function GET(req) {
  try {
    // Extract ID from URL path
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const id = pathSegments[pathSegments.length - 2]; // [id] is second last segment

    if (!id) {
      return new Response("Post ID required", { status: 400 });
    }

    await connectDB();

    const post = await Post.findById(id);
    if (!post) return new Response("Post not found", { status: 404 });

    return new Response(JSON.stringify(post.comments), { status: 200 });
  } catch (error) {
    console.error("❌ Fetch Comments Error:", error);
    return new Response("Failed to fetch comments", { status: 500 });
  }
}