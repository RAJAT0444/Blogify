
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post";
import User from "../../../models/User";

// 🟢 GET: Fetch all posts (optionally filter by search or userEmail)
export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const userEmail = searchParams.get("userEmail");

  const query = {
    title: { $regex: search, $options: "i" },
  };

  if (userEmail) {
    const user = await User.findOne({ email: userEmail });
    if (user) {
      query.user = user._id;
    } else {
      // If user not found, return empty list
      return new Response(JSON.stringify({ posts: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  try {
    const posts = await Post.find(query)
      .populate("user", "name email _id") // Only get selected user fields
      .lean();

    // ✅ Filter out posts where user was deleted (user is null)
    const validPosts = posts.filter((post) => post.user !== null);

    return new Response(JSON.stringify({ posts: validPosts }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Failed to fetch posts:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch posts" }), {
      status: 500,
    });
  }
}

// 🟡 POST: Create a new post
export async function POST(req) {
  try {
    const session = await getServerSession({ req, ...authOptions });
    if (!session) return new Response("Unauthorized", { status: 401 });

    await dbConnect();
    const { title, content, imageUrl } = await req.json();
    const user = await User.findOne({ email: session.user.email });

    if (!user) return new Response("User not found", { status: 404 });

    const newPost = await Post.create({
      title,
      content,
      imageUrl,
      author: user.name || session.user.name || session.user.email,
      user: user._id,
    });

    return new Response(JSON.stringify(newPost), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Post creation error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}









