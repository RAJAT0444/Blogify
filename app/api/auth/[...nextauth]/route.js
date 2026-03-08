


// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
// import { authOptions } from "../../../../lib/authOptions"; // ✅ Correct import
import { authOptions } from "@/lib/authOptions"; // ✅ Correct import

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

