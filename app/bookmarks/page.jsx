// "use client"

// import { useEffect, useState } from "react"
// import { useSession } from "next-auth/react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// export default function BookmarkPage() {
//   const { data: session, status } = useSession()
//   const [bookmarks, setBookmarks] = useState([])
//   const [loading, setLoading] = useState(true)
//   const router = useRouter()

//   useEffect(() => {
//     if (status === "unauthenticated") router.push("/api/auth/signin")
//   }, [status, router])

//   useEffect(() => {
//     async function fetchBookmarks() {
//       if (status === "authenticated") {
//         try {
//           const res = await fetch("/api/users/bookmark")
//           if (res.ok) {
//             const data = await res.json()
//             setBookmarks(data)
//           } else {
//             console.error("Failed to fetch bookmarks")
//           }
//         } catch (err) {
//           console.error("Error fetching bookmarks:", err)
//         } finally {
//           setLoading(false)
//         }
//       }
//     }

//     fetchBookmarks()
//   }, [status])

//   const handleUnsave = async (postId) => {
//     const confirmDelete = window.confirm("Are you sure you want to remove this bookmark?")
//     if (!confirmDelete) return

//     try {
//       const res = await fetch(`/api/users/bookmark/${postId}`, {
//         method: "DELETE",
//       })

//       if (res.ok) {
//         setBookmarks((prev) => prev.filter((b) => b._id !== postId))
//       } else {
//         alert("❌ Could not remove bookmark.")
//       }
//     } catch (err) {
//       alert("❌ Error removing bookmark.")
//     }
//   }

//   if (status === "loading" || loading) {
//     return <p className="p-6">🔄 Loading your bookmarks...</p>
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">🔖 Your Bookmarked Posts</h1>
//       {bookmarks.length === 0 ? (
//         <p>No bookmarks yet.</p>
//       ) : (
//         <div className="grid gap-4">
//           {bookmarks.map((post) => (
//             <div key={post._id} className="border p-4 rounded shadow bg-white">
//               <h2 className="text-xl font-semibold">{post.title}</h2>
//               <p className="text-gray-600">{post.content?.slice(0, 100)}...</p>
//               <div className="flex justify-between items-center mt-2">
//                 <Link
//                   href={`/post/${post._id}`}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Read more →
//                 </Link>
//                 <button
//                   onClick={() => handleUnsave(post._id)}
//                   className="text-red-600 hover:underline"
//                 >
//                   ❌ Unsave
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }
















// "use client"

// import { useEffect, useState } from "react"
// import { useSession } from "next-auth/react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// export default function BookmarkPage() {
//   const { data: session, status } = useSession()
//   const [bookmarks, setBookmarks] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [selectedPostId, setSelectedPostId] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const router = useRouter()

//   useEffect(() => {
//     if (status === "unauthenticated") router.push("/api/auth/signin")
//   }, [status, router])

//   useEffect(() => {
//     async function fetchBookmarks() {
//       if (status === "authenticated") {
//         try {
//           const res = await fetch("/api/users/bookmark")
//           if (res.ok) {
//             const data = await res.json()
//             setBookmarks(data)
//           } else {
//             console.error("Failed to fetch bookmarks")
//           }
//         } catch (err) {
//           console.error("Error fetching bookmarks:", err)
//         } finally {
//           setLoading(false)
//         }
//       }
//     }

//     fetchBookmarks()
//   }, [status])

//   const handleUnsaveConfirm = async () => {
//     if (!selectedPostId) return
//     try {
//       const res = await fetch(`/api/users/bookmark/${selectedPostId}`, {
//         method: "DELETE",
//       })

//       if (res.ok) {
//         setBookmarks((prev) => prev.filter((b) => b._id !== selectedPostId))
//       } else {
//         alert("❌ Could not remove bookmark.")
//       }
//     } catch (err) {
//       alert("❌ Error removing bookmark.")
//     } finally {
//       setShowModal(false)
//       setSelectedPostId(null)
//     }
//   }

//   if (status === "loading" || loading) {
//     return <p className="p-6">🔄 Loading your bookmarks...</p>
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">🔖 Your Bookmarked Posts</h1>

//       {bookmarks.length === 0 ? (
//         <p>No bookmarks yet.</p>
//       ) : (
//         <div className="grid gap-4">
//           {bookmarks.map((post) => (
//             <div key={post._id} className="border p-4 rounded shadow bg-white">
//               <h2 className="text-xl font-semibold">{post.title}</h2>
//               <p className="text-gray-600">{post.content?.slice(0, 100)}...</p>
//               <div className="flex justify-between items-center mt-2">
//                 <Link
//                   href={`/post/${post._id}`}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Read more →
//                 </Link>
//                 <button
//                   onClick={() => {
//                     setSelectedPostId(post._id)
//                     setShowModal(true)
//                   }}
//                   className="text-red-600 hover:underline"
//                 >
//                   ❌ Unsave
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* 🔴 Simple Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-80">
//             <h2 className="text-lg font-bold mb-4">Remove Bookmark?</h2>
//             <p className="mb-4 text-sm text-gray-700">
//               Are you sure you want to remove this post from your bookmarks?
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => {
//                   setShowModal(false)
//                   setSelectedPostId(null)
//                 }}
//                 className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUnsaveConfirm}
//                 className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 Unsave
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }









// "use client"

// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";

// export default function BookmarkPage() {
//   const { data: session, status } = useSession();
//   const [bookmarks, setBookmarks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedPostId, setSelectedPostId] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") router.push("/api/auth/signin");
//   }, [status, router]);

//   useEffect(() => {
//     async function fetchBookmarks() {
//       if (status === "authenticated") {
//         try {
//           const res = await fetch("/api/users/bookmark");
//           if (res.ok) {
//             const data = await res.json();
//             setBookmarks(data);
//           } else {
//             console.error("Failed to fetch bookmarks");
//           }
//         } catch (err) {
//           console.error("Error fetching bookmarks:", err);
//         } finally {
//           setLoading(false);
//         }
//       }
//     }

//     fetchBookmarks();
//   }, [status]);

//   const handleUnsaveConfirm = async () => {
//     if (!selectedPostId) return;
//     try {
//       const res = await fetch(`/api/users/bookmark/${selectedPostId}`, {
//         method: "DELETE",
//       });

//       if (res.ok) {
//         setBookmarks((prev) => prev.filter((b) => b._id !== selectedPostId));
//       } else {
//         alert("❌ Could not remove bookmark.");
//       }
//     } catch (err) {
//       alert("❌ Error removing bookmark.");
//     } finally {
//       setShowModal(false);
//       setSelectedPostId(null);
//     }
//   };

//   // Mock data for demonstration
//   useEffect(() => {
//     if (bookmarks.length === 0 && status === "authenticated") {
//       setTimeout(() => {
//         setBookmarks([
//           {
//             _id: "1",
//             title: "The Future of Web Development",
//             content: "Exploring the latest trends and technologies shaping the future of web development. From AI-powered tools to new frameworks, we cover it all.",
//             date: "2023-10-15",
//             category: "Technology"
//           },
//           {
//             _id: "2",
//             title: "Design Systems in Modern UI",
//             content: "How design systems are revolutionizing UI development and why every company should invest in one.",
//             date: "2023-09-22",
//             category: "Design"
//           },
//           {
//             _id: "3",
//             title: "State Management in React",
//             content: "Comparing different state management solutions for React applications and when to use each.",
//             date: "2023-08-30",
//             category: "Development"
//           }
//         ]);
//         setLoading(false);
//       }, 1500);
//     }
//   }, [bookmarks, status]);

//   if (status === "loading" || loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <div className="h-10 bg-gray-200 rounded-full w-64 mb-2 animate-pulse"></div>
//               <div className="h-4 bg-gray-200 rounded-full w-48 animate-pulse"></div>
//             </div>
//             <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {[...Array(4)].map((_, i) => (
//               <div key={i} className="bg-white rounded-xl shadow-md p-5 animate-pulse">
//                 <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-4"></div>
//                 <div className="h-4 bg-gray-200 rounded-full mb-2"></div>
//                 <div className="h-4 bg-gray-200 rounded-full mb-2"></div>
//                 <div className="h-4 bg-gray-200 rounded-full mb-4 w-1/2"></div>
//                 <div className="flex justify-between">
//                   <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
//                   <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Your Bookmarked Posts</h1>
//             <p className="text-gray-500 mt-1">
//               {bookmarks.length} {bookmarks.length === 1 ? "saved item" : "saved items"}
//             </p>
//           </div>
//           <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-1 rounded-full">
//             <div className="bg-white p-1 rounded-full">
//               <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
//             </div>
//           </div>
//         </div>

//         {bookmarks.length === 0 ? (
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-2xl shadow-lg p-8 text-center"
//           >
//             <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
//               </svg>
//             </div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-2">No bookmarks yet</h3>
//             <p className="text-gray-600 mb-6 max-w-md mx-auto">
//               Start saving your favorite posts to revisit them later. Your saved items will appear here.
//             </p>
//             <button 
//               className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-md"
//               onClick={() => router.push("/")}
//             >
//               Discover Posts
//             </button>
//           </motion.div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <AnimatePresence>
//               {bookmarks.map((post) => (
//                 <motion.div
//                   key={post._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ duration: 0.3 }}
//                   className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
//                 >
//                   <div className="p-5">
//                     <div className="flex justify-between items-start mb-3">
//                       <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
//                         {post.category}
//                       </span>
//                       <span className="text-gray-500 text-sm">{post.date}</span>
//                     </div>
//                     <h2 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h2>
//                     <p className="text-gray-600 mb-4">{post.content?.slice(0, 120)}...</p>
//                     <div className="flex justify-between items-center">
//                       <Link
//                         href={`/post/${post._id}`}
//                         className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
//                       >
//                         Read full post
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </Link>
//                       <button
//                         onClick={() => {
//                           setSelectedPostId(post._id);
//                           setShowModal(true);
//                         }}
//                         className="flex items-center text-gray-500 hover:text-red-500 transition-colors"
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                           <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                         </svg>
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         )}
//       </div>

//       {/* Modern Modal */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
//             >
//               <div className="p-6">
//                 <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Remove Bookmark?</h3>
//                 <p className="text-gray-600 text-center mb-6">
//                   Are you sure you want to remove this post from your bookmarks?
//                 </p>
//                 <div className="flex justify-center space-x-4">
//                   <button
//                     onClick={() => {
//                       setShowModal(false);
//                       setSelectedPostId(null);
//                     }}
//                     className="px-6 py-2.5 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleUnsaveConfirm}
//                     className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-md"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }














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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
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
