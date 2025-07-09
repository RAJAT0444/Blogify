// ✅ /app/api/users/bookmark/[id]/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import connectDB from "../../../../../lib/dbConnect";
import User from "../../../../../models/User";

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  const postId = params.id;

  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await connectDB();

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $pull: { bookmarks: postId } },
      { new: true }
    );

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response("Bookmark removed", { status: 200 });
  } catch (error) {
    console.error("Error removing bookmark:", error);
    return new Response("Server error", { status: 500 });
  }
}
