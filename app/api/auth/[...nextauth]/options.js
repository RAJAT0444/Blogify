// app/api/auth/[...nextauth]/options.js

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Yahan aap apni database se user fetch karo
        const user = await getUserByEmail(email); // <-- apni function likho

        if (!user || user.password !== password) {
          throw new Error("Invalid email or password");
        }

        // Agar sab sahi ho
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/login", // optional
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
