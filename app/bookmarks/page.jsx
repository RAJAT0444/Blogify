


"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function BookmarkPage() {
  const { data: session, status } = useSession();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  const fetchBookmarks = async () => {
    if (status === "authenticated") {
      try {
        const res = await fetch("/api/users/bookmark");
        if (res.ok) {
          const data = await res.json();
          setBookmarks(data);
        } else {
          console.error("Failed to fetch bookmarks");
        }
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [status]);

  // 👇 Optional mock data in development only
  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
      bookmarks.length === 0 &&
      status === "authenticated" &&
      !loading
    ) {
      setTimeout(() => {
        setBookmarks([
          {
            _id: "1",
            title: "The Future of Web Development",
            content: "Exploring the latest trends in web development.",
            date: "2023-10-15",
            category: "Technology",
          },
          {
            _id: "2",
            title: "Design Systems in Modern UI",
            content: "How design systems are changing UI development.",
            date: "2023-09-22",
            category: "Design",
          },
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [bookmarks.length, status, loading]);

  const handleUnsaveConfirm = async () => {
    if (!selectedPostId) return;
    try {
      const res = await fetch(`/api/users/bookmark/${selectedPostId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBookmarks((prev) => prev.filter((b) => b._id !== selectedPostId));
      } else {
        alert("❌ Could not remove bookmark.");
      }
    } catch (err) {
      alert("❌ Error removing bookmark.");
    } finally {
      setShowModal(false);
      setSelectedPostId(null);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-64 mb-4" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded mb-4 shadow">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded mb-1" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Your Bookmarked Posts</h1>
            <p className="text-gray-500">
              {bookmarks.length} {bookmarks.length === 1 ? "saved item" : "saved items"}
            </p>
          </div>
        </div>

        {bookmarks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-8 shadow text-center"
          >
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">No bookmarks yet</h3>
            <p className="text-gray-600 mb-4">Start saving your favorite posts.</p>
            <button
              onClick={() => router.push("/")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Browse Posts
            </button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatePresence>
              {bookmarks.map((post) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl p-5 shadow border"
                >
                  <div className="flex justify-between text-sm mb-2 text-gray-500">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h2 className="text-lg font-bold mb-2 text-gray-800">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.content?.slice(0, 120)}...</p>
                  <div className="flex justify-between items-center">
                    <Link href={`/post/${post._id}`} className="text-blue-600 hover:underline">
                      Read More →
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedPostId(post._id);
                        setShowModal(true);
                      }}
                      className="text-red-500 hover:underline text-sm"
                    >
                      ❌ Unsave
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-blue-400 bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full"
            >
              <h2 className="text-lg font-semibold mb-2 text-gray-800 text-center">Remove Bookmark?</h2>
              <p className="text-center text-gray-600 mb-6">Are you sure you want to unsave this post?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedPostId(null);
                  }}
                  className="px-4 py-2 border text-black border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUnsaveConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Unsave
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
