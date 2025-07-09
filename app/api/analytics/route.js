// app/api/analytics/route.js




import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";
import dbConnect from "../../../lib/dbConnect";
import Post from "../../../models/Post";
import User from "../../../models/User";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    await dbConnect();

    // Get the current user
    const currentUser = await User.findOne({ email: session.user.email });

    if (!currentUser) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Only fetch posts created by this user
    const userPosts = await Post.find({ user: currentUser._id });

    const totalPosts = userPosts.length;

    // ✅ Count total comments on user's posts only
    const totalComments = userPosts.reduce((sum, post) => sum + (post.comments?.length || 0), 0);

    const totalUsers = await User.countDocuments();

    // Get recent posts with stats (only for this user)
    const recentPosts = await Post.find({ user: currentUser._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email")
      .lean();

    const recentPostsWithStats = recentPosts.map((post) => ({
      _id: post._id,
      title: post.title,
      user: post.user,
      createdAt: post.createdAt,
      likesCount: post.likes?.length || 0,
      commentsCount: post.comments?.length || 0,
    }));

    return new Response(
      JSON.stringify({
        totalPosts,
        totalUsers,
        totalComments,
        recentPosts: recentPostsWithStats,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Analytics error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
