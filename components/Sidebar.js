



'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  FiCompass,
  FiLayout,
  FiEdit,
  FiFileText,
  FiUser,
  FiSettings,
  FiLogOut,
  FiHome,
  FiTrendingUp,
  FiBookmark,
  FiMessageSquare,
  FiX
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const links = [
    { href: "/", label: "Home", icon: <FiHome size={20} /> },
    { href: "/explore", label: "Blogs", icon: <FiCompass size={20} /> },
    { href: "/dashboard", label: "Dashboard", icon: <FiLayout size={20} /> },
    { href: "/create", label: "Create Post", icon: <FiEdit size={20} /> },
    { href: "/bookmarks", label: "Bookmarks", icon: <FiBookmark size={20} /> },
    { href: "/analytics", label: "Analytics", icon: <FiTrendingUp size={20} /> },
    { href: "/settings", label: "Settings", icon: <FiSettings size={20} /> },
    { href: "/support", label: "Support 24×7", icon: <FiMessageSquare size={20} /> },
  ];

  const isAuthenticated = status === "authenticated";

  // Close sidebar when clicking any link
  const handleLinkClick = () => {
    if (isOpen) {
      onClose();
    }
  };

  const renderSidebarContent = (isMobile = false) => (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header with close button for mobile */}
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Blogify
        </div>
        {isMobile && (
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiX size={24} className="text-gray-500" />
          </button>
        )}
      </div>

      {/* Authenticated user content */}
      {isAuthenticated ? (
        <>
          <div className="flex-1 overflow-y-auto pb-6">
            {/* User Profile */}
            <div className="flex items-center gap-3 mb-6 px-3 py-3 text-black rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {session.user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="font-medium truncate">{session.user.name}</p>
                <p className="text-sm text-gray-500 truncate">
                  @{session.user.username || session.user.name.toLowerCase().replace(/\s/g, '')}
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1">
              {links.map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all text-sm ${
                    pathname === href
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-medium border border-blue-100"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className={`${pathname === href ? "text-blue-500" : "text-gray-500"}`}>
                    {icon}
                  </span>
                  <span>{label}</span>
                  {pathname === href && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Footer with Logout */}
          <div className="pt-4 border-t border-gray-100 px-2">
            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 text-sm hover:bg-gray-100 transition-colors"
            >
              <FiLogOut size={20} className="text-gray-500" />
              <span>Log Out</span>
            </button>

            {!isMobile && (
              <p className="text-xs text-gray-400 mt-4 px-2">
                © {new Date().getFullYear()} Blogify
              </p>
            )}
          </div>
        </>
      ) : (
        // Guest User View
        <div className="flex flex-col justify-between flex-1">
          <div className="flex flex-col gap-3 px-2">
            <p className="text-sm text-gray-500 mb-2 px-2">Welcome, Guest 👋</p>
            <Link
              href="/login"
              onClick={handleLinkClick}
              className="w-full text-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2.5 rounded-lg transition-all shadow-sm"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              onClick={handleLinkClick}
              className="w-full text-center border border-gray-300 hover:border-gray-400 text-gray-800 py-2.5 rounded-lg transition-all"
            >
              Sign Up
            </Link>
          </div>

          {!isMobile && (
            <p className="text-xs text-gray-400 mt-6 px-4">
              © {new Date().getFullYear()} Blogify
            </p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar with dark overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white shadow-xl p-4 w-72 fixed z-40 h-full md:hidden overflow-y-auto"
          >
            {renderSidebarContent(true)}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col bg-white shadow-sm p-4 w-64 fixed z-20 h-full border-r border-gray-100 overflow-y-auto">
        {renderSidebarContent(false)}
      </aside>
    </>
  );
}