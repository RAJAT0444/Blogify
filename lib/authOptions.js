// app/lib/authOptions.js

import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../lib/dbConnect";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid credentials");

        return { id: user._id, email: user.email, name: user.name };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
















// // app/lib/authOptions.js

// import CredentialsProvider from "next-auth/providers/credentials";
// import connectDB from "../lib/dbConnect";
// import User from "../models/User";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         await connectDB();

//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Missing email or password");
//         }

//         const user = await User.findOne({ email: credentials.email });

//         if (!user) {
//           throw new Error("No user found with this email");
//         }

//         const isValid = await bcrypt.compare(credentials.password, user.password);

//         if (!isValid) {
//           throw new Error("Invalid credentials");
//         }

//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: user.name,
//         };
//       },
//     }),
//   ],

//   pages: {
//     signIn: "/auth/login",
//   },

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session?.user && token?.id) {
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };
