// import connectDB from "../../../../lib/dbConnect";
// import User from "../../../../models/User";

// export async function GET(req, context) {
//   const { params } = context;
//   const { id } = params;

//   if (!id) return new Response("User ID is required", { status: 400 });

//   await connectDB();

//   try {
//     const user = await User.findById(id).select("name email image");
//     if (!user) return new Response("User not found", { status: 404 });

//     return new Response(
//       JSON.stringify({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         avatar: user.image || "/default-avatar.png",
//       }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return new Response("Something went wrong", { status: 500 });
//   }
// }












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
