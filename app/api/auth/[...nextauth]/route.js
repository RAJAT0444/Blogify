


// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import connectDB from "../../../../lib/dbConnect";
// import User from "../../../../models/User";

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

//         const isPasswordValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isPasswordValid) {
//           throw new Error("Invalid password");
//         }

//         // ✅ Return ID, name, email
//         return {
//           id: user._id.toString(), // VERY IMPORTANT: Make sure _id is passed here
//           name: user.name,
//           email: user.email,
//         };
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt", // ✅ use JWT strategy
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       // ✅ Add user ID to JWT
//       if (user) {
//         token.id = user.id; // This comes from return in authorize()
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       // ✅ Add token.id to session.user.id
//       if (session?.user && token?.id) {
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };













import NextAuth from "next-auth";
import { authOptions } from "./options";

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;

