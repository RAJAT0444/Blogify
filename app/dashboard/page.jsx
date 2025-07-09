


// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { useSession } from 'next-auth/react'
// import Link from 'next/link'

// export default function DashboardPage() {
//   const router = useRouter()
//   const { data: session, status } = useSession()

//   const [posts, setPosts] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [expandedPosts, setExpandedPosts] = useState({})

//   const fetchPosts = async () => {
//     if (!session?.user?.email) return

//     setLoading(true)
//     setError(null)

//     try {
//       const res = await fetch(`/api/posts`)
//       const data = await res.json()
//       if (!res.ok) throw new Error(data.error || 'Failed to fetch posts')
//       if (!Array.isArray(data.posts)) throw new Error('Invalid data format')

//       const userPosts = data.posts.filter(
//         (post) => post.user?.email === session.user.email
//       )

//       setPosts(userPosts)
//     } catch (err) {
//       console.error('❌ Error:', err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (status === 'authenticated') fetchPosts()
//   }, [status, session])

//   const handleDelete = async (postId) => {
//     const confirmDelete = confirm("Are you sure you want to delete this post?")
//     if (!confirmDelete) return

//     try {
//       const res = await fetch(`/api/posts/${postId}`, {
//         method: 'DELETE',
//       })
//       if (res.ok) {
//         fetchPosts()
//       } else {
//         alert("Failed to delete post")
//       }
//     } catch (err) {
//       console.error("Delete error:", err)
//     }
//   }

//   const toggleReadMore = (postId) => {
//     setExpandedPosts((prev) => ({
//       ...prev,
//       [postId]: !prev[postId],
//     }))
//   }

//   if (status === 'loading') return <div className="p-6 text-white">Loading...</div>
//   if (!session?.user?.email) return <div className="p-6 text-white">Please login</div>

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4 md:p-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-white mb-6">
//           Welcome, {session.user.name}
//         </h1>

//         {loading && <p className="text-white">Loading posts...</p>}
//         {error && <p className="text-red-400">{error}</p>}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {posts.map((post) => {
//             const isExpanded = expandedPosts[post._id]
//             const contentPreview = post.content?.split('\n').join(' ').slice(0, 220)

//             return (
//               <div
//                 key={post._id}
//                 className="bg-gradient-to-br from-indigo-700/30 to-purple-500/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300 hover:shadow-xl flex flex-col"
//               >
//                 {post.imageUrl && (
//                   <div className="aspect-video overflow-hidden">
//                     <img
//                       src={post.imageUrl}
//                       alt={post.title}
//                       className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                     />
//                   </div>
//                 )}

//                 <div className="p-5 flex-1 flex flex-col">
//                   <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">{post.title}</h2>

//                   <p className="text-indigo-100 mb-2">
//                     {isExpanded ? post.content : `${contentPreview}...`}
//                   </p>

//                   {post.content.length > 220 && (
//                     <button
//                       onClick={() => toggleReadMore(post._id)}
//                       className="text-sm text-pink-400 hover:text-pink-300 font-medium mb-3"
//                     >
//                       {isExpanded ? 'Read Less ▲' : 'Read More ▼'}
//                     </button>
//                   )}

//                   <div className="flex justify-between mb-4">
//                     <button
//                       onClick={() => handleDelete(post._id)}
//                       className="text-sm text-red-400 hover:text-red-300"
//                     >
//                       🗑️ Delete
//                     </button>
//                     <button
//                       onClick={() => router.push(`/edit/${post._id}`)}
//                       className="text-sm text-cyan-400 hover:text-cyan-300"
//                     >
//                       ✏️ Edit
//                     </button>
//                   </div>

//                   <div className="flex items-center mt-auto pt-4 border-t border-indigo-500/30">
//                     <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
//                     <div className="ml-3">
//                       <Link href={`/profile/${post.user?._id || ''}`}>
//                         <p className="text-sm font-medium text-white hover:text-cyan-300 transition-colors">
//                           @{post.user?.name || 'Unknown'}
//                         </p>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </div>
//   )
// }



















'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FiEdit2, FiTrash2, FiUser, FiClock } from 'react-icons/fi'

export default function DashboardPage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [expandedPosts, setExpandedPosts] = useState({})

  const fetchPosts = async () => {
    if (!session?.user?.email) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`/api/posts`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to fetch posts')
      if (!Array.isArray(data.posts)) throw new Error('Invalid data format')

      const userPosts = data.posts.filter(
        (post) => post.user?.email === session.user.email
      )

      setPosts(userPosts)
    } catch (err) {
      console.error('❌ Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') fetchPosts()
  }, [status, session])

  const handleDelete = async (postId) => {
    const confirmDelete = confirm("Are you sure you want to delete this post?")
    if (!confirmDelete) return

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchPosts()
        alert("Post deleted successfully")
      } else {
        throw new Error("Failed to delete post")
      }
    } catch (err) {
      console.error("Delete error:", err)
      alert(err.message)
    }
  }

  const toggleReadMore = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  if (status === 'loading') return (
    <div className="flex items-center justify-center min-h-screen bg-[#f1faee]">
      <div className="text-[#1d3557]">Loading...</div>
    </div>
  )
  
  if (!session?.user?.email) return (
    <div className="flex items-center justify-center min-h-screen bg-[#f1faee]">
      <div className="text-[#1d3557]">Please login to view your dashboard</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f1faee] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1d3557] mb-2">
            Welcome back, {session.user.name}
          </h1>
          <p className="text-[#457b9d]">Manage your posts and content</p>
        </div>

        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#e63946]"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-[#e63946]/10 border border-[#e63946] text-[#e63946] p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {posts.length === 0 && !loading ? (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-[#a8dadc] text-center">
            <h3 className="text-xl font-medium text-[#1d3557] mb-2">No posts yet</h3>
            <p className="text-[#457b9d] mb-4">Create your first post to get started</p>
            <button
              onClick={() => router.push('/create')}
              className="px-4 py-2 bg-[#e63946] text-[#f1faee] rounded-lg hover:bg-[#e63946]/90 transition-colors"
            >
              Create New Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const isExpanded = expandedPosts[post._id]
              const contentPreview = post.content?.split('\n').join(' ').slice(0, 160)

              return (
                <div
                  key={post._id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#a8dadc] flex flex-col"
                >
                  {post.imageUrl && (
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1d3557]/30 to-transparent" />
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-lg font-bold text-[#1d3557] line-clamp-2">{post.title}</h2>
                      <span className="text-xs bg-[#a8dadc] text-[#1d3557] px-2 py-1 rounded-full ml-2">
                        {post.category || 'General'}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-[#457b9d] mb-3">
                      <FiClock className="mr-1" size={14} />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="mb-4">
                      <p className="text-[#1d3557]/90 mb-2 leading-relaxed">
                        {isExpanded ? post.content : `${contentPreview}${post.content.length > 160 ? '...' : ''}`}
                      </p>
                      {post.content.length > 160 && (
                        <button
                          onClick={() => toggleReadMore(post._id)}
                          className="text-sm text-[#e63946] hover:text-[#1d3557] font-medium"
                        >
                          {isExpanded ? 'Show less' : 'Continue reading'}
                        </button>
                      )}
                    </div>

                    <div className="flex justify-between mt-auto pt-4 border-t border-[#a8dadc]">
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="flex items-center text-sm text-[#e63946] hover:text-[#1d3557]"
                      >
                        <FiTrash2 className="mr-1" size={16} />
                        Delete
                      </button>
                      <button
                        onClick={() => router.push(`/edit/${post._id}`)}
                        className="flex items-center text-sm text-[#457b9d] hover:text-[#1d3557]"
                      >
                        <FiEdit2 className="mr-1" size={16} />
                        Edit
                      </button>
                    </div>

                    <div className="flex items-center mt-4 pt-4 border-t border-[#a8dadc]">
                      <div className="w-8 h-8 rounded-full bg-[#457b9d] flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                        {post.user?.image ? (
                          <img src={post.user.image} alt={post.user.name} className="w-full h-full object-cover" />
                        ) : (
                          <FiUser className="text-[#f1faee]" size={16} />
                        )}
                      </div>
                      <div className="ml-3">
                        <Link href={`/profile/${post.user?._id || ''}`}>
                          <p className="text-sm font-medium text-[#1d3557] hover:text-[#e63946] transition-colors">
                            @{post.user?.name || 'Unknown'}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}