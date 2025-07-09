// components/SidebarWrapper.js
"use client";

import { useSession } from "next-auth/react";
import Sidebar from "./Sidebar";

export default function SidebarWrapper() {
  const { data: session, status } = useSession();

  if (status === "loading") return null; // Jab tak session load ho raha hai, kuch mat dikhao
  if (!session) return null; // Agar login nahi hai, Sidebar na dikhao

  return (
    <aside className="w-64 hidden md:block border-r border-gray-200 min-h-screen bg-gray-50">
      <Sidebar />
    </aside>
  );
}
