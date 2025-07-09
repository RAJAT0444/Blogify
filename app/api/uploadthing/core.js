import { createUploadthing } from "uploadthing/next"; // ✅ correct import
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// ✅ Manually pass token using config
const f = createUploadthing({
  token: process.env.UPLOADTHING_TOKEN, // 👈 explicitly pass token
});

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await getServerSession({ req, ...authOptions });
      if (!session) throw new Error("Unauthorized");
      return { userId: session.user.email };
    })
    .onUploadComplete(async ({ file }) => {
      console.log("✅ File uploaded:", file.url);
    }),
};
