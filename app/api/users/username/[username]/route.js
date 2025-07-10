
// app/api/users/username/[username]/route.ts

import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../lib/dbConnect"; // ✅ Use alias if configured
import User from "../../../../../models/User";

export async function GET(req, { params }) {
  await connectDB();

  const { username } = params;

  try {
    const user = await User.findOne({ name: username }).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      avatar: user.avatar || "",
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
