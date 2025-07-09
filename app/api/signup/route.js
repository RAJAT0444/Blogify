// ✅ Correct default import
import connectDB from "../../../lib/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    await connectDB(); // ✅ Correct usage

    const existing = await User.findOne({ email });
    if (existing) {
      return new Response(JSON.stringify({ error: "Email already registered." }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });

    return new Response(JSON.stringify({ message: "Signup successful" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
