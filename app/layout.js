

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import { authOptions } from "../lib/authOptions";
import { getServerSession } from "next-auth";
import Navbar from "../components/Navbar";
import SidebarWrapper from "../components/SidebarWrapper";
import { Toaster } from "react-hot-toast"; // ✅ Switched from react-toastify

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata = {
  title: "Blogify",
  description: "Simple blog app",
  icons: {
    icon: "/image/icon.png", // ✅ Your favicon here
  },
};

export default async function RootLayout({ children }) {
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (err) {
    console.error("❌ Session fetch failed:", err);
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}>
        <Providers session={session}>
          <Navbar />
          <div className="flex pt-16">
            <SidebarWrapper />
            <main className="flex-1 p-4">{children}</main>
          </div>
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
