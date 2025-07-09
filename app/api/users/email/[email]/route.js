// app/api/users/email/[email]/route.js
import { NextResponse } from 'next/server'
import connectDB from '../../../../../lib/dbConnect'
import User from '../../../../../models/User'

export async function GET(req, { params }) {
  await connectDB()
  const { email } = params

  try {
    const user = await User.findOne({ email }).lean()
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      avatar: user.avatar || '',
      _id: user._id,
    })
  } catch (error) {
    console.error('User fetch error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
