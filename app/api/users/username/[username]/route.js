
import connectDB from '../../../../../lib/dbConnect'; // ✅ Corrected import
import User from '../../../../../models/User';

export default async function handler(req, res) {
  await connectDB();

  const { username } = req.query;

  try {
    const user = await User.findOne({ name: username }).lean();
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      name: user.name,
      email: user.email,
      avatar: user.avatar || '',
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
