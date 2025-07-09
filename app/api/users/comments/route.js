import connectDB from "../../../../lib/dbConnect";
import Post from "../../../../models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  await connectDB();

  try {
    // 🔍 DEBUG: Print logged in user email
    console.log("🔐 Logged-in user:", session.user.email);

    // 🧪 FETCH all posts by author email
    const posts = await Post.find({ author: session.user.email }).select("title author comments");

    console.log("📝 Posts found:", posts.length);
    console.log("📄 First post sample:", posts[0]);

    // Map all comments
    const allComments = posts.flatMap(post =>
      post.comments.map(comment => ({
        postTitle: post.title,
        ...comment,
      }))
    );

    return new Response(JSON.stringify(allComments), { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching user comments:", error);
    return new Response("Failed to fetch comments", { status: 500 });
  }
}
