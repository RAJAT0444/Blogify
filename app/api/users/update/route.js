import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '../../../../models/User';
import connectDB from '../../../../lib/dbConnect';

export async function PATCH(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    const email = formData.get('email');
    const name = formData.get('name');
    const password = formData.get('password');
    const imageFile = formData.get('image');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (password && password.length >= 6) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    if (imageFile && imageFile.name) {
      updateData.image = `/uploads/${Date.now()}_${imageFile.name}`;
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Update Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
