import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "../../../../lib/dbConnect"; // ← apni DB utility
import User from "../../../../models/User";         // ← apna mongoose User model
import bcrypt from "bcryptjs";           // for secure password compare

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Connect to DB
        await connectToDB();

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // Compare hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Incorrect password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/login", // can show error message
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
