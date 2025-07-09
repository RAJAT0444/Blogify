import { hash } from 'bcryptjs';
import { connectToDB } from '@/utils/mongodb';
import User from '@/models/User';

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!email || !password || !name) {
    return new Response(JSON.stringify({ message: 'All fields required' }), { status: 400 });
  }

  await connectToDB();

  const existing = await User.findOne({ email });
  if (existing) {
    return new Response(JSON.stringify({ message: 'Email already in use' }), { status: 409 });
  }

  const hashedPassword = await hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return new Response(JSON.stringify({ message: 'User created' }), { status: 201 });
}
