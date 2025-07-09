// app/api/posts/by-user/route.js
import connectDB from "../../../../lib/dbConnect";
import Post from "../../../../models/Post";
import User from '../../../../models/User'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')

  if (!username) {
    return new Response('Username is required', { status: 400 })
  }

  try {
    await connectDB()

    const user = await User.findOne({ name: username }).lean()
    if (!user) {
      return new Response('User not found', { status: 404 })
    }

    const posts = await Post.find({ author: user.email }).sort({ createdAt: -1 })
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Error fetching posts:', err)
    return new Response('Internal Server Error', { status: 500 })
  }
}
