'use client';

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function ClientLayout({ children, session }) {
  return (
    <>
      <Navbar />
      {session && <Sidebar />}
      {children}
    </>
  );
}
