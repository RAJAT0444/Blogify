

'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  FiSearch, FiHeart, FiMessageSquare, FiBookmark,
  FiUser, FiClock, FiArrowRight, FiSend, FiTrash2
} from 'react-icons/fi'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { useSession } from 'next-auth/react'

export default function ExplorePage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [expandedPosts, setExpandedPosts] = useState({})
  const [activeCategory, setActiveCategory] = useState('all')
  const [commentInputs, setCommentInputs] = useState({})
  const [expandedComments, setExpandedComments] = useState({})

  const fetchPosts = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/posts?search=${encodeURIComponent(query)}&category=${activeCategory}`)
      const data = await res.json()

      if (!Array.isArray(data.posts)) throw new Error('Invalid data format from API')

      // Add isLiked property with safe array access
      const postsWithLikes = data.posts.map(post => ({
        ...post,
        isLiked: session?.user?.email
          ? (post.likes || []).some(like => like.userEmail === session.user.email)
          : false
      }))

      setPosts(postsWithLikes)
      const initialCommentStates = data.posts.reduce((acc, post) => {
        acc[post._id] = ''
        return acc
      }, {})
      setCommentInputs(initialCommentStates)
    } catch (err) {
      console.error('❌ Fetching failed:', err)
      setError(err.message)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [activeCategory, session])

  const handleLike = async (postId) => {
    if (!session) {
      toast.error('Please login to like posts', {
        style: { background: '#1d3557', color: '#f1faee', border: '1px solid #e63946' }
      })
      return
    }

    try {
      // Find the post to get current isLiked status
      const post = posts.find(p => p._id === postId)
      const isCurrentlyLiked = post?.isLiked || false

      // Optimistic UI update with safe array access
      setPosts(prevPosts => prevPosts.map(post =>
        post._id === postId ? {
          ...post,
          likes: isCurrentlyLiked
            ? (post.likes || []).filter(like => like.userEmail !== session.user.email)
            : [...(post.likes || []), { userEmail: session.user.email }],
          isLiked: !isCurrentlyLiked
        } : post
      ))

      const res = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!res.ok) {
        throw new Error('Failed to update like')
      }

      const result = await res.json()

      toast.success(!isCurrentlyLiked ? 'Post liked!' : 'Post unliked!', {
        style: { background: '#1d3557', color: '#f1faee', border: '1px solid #457b9d' }
      })
    } catch (err) {
      // Revert on error
      setPosts(prevPosts => prevPosts.map(post =>
        post._id === postId ? {
          ...post,
          isLiked: post.isLiked
        } : post
      ))

      toast.error('Failed to update like', {
        style: { background: '#1d3557', color: '#f1faee', border: '1px solid #e63946' }
      })
    }
  }

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
  }

  const handleCommentSubmit = async (postId) => {
    const content = commentInputs[postId]?.trim()
    if (!content) return

    try {
      // Optimistic UI update
      const tempCommentId = `temp-${Date.now()}`
      const newComment = {
        _id: tempCommentId,
        content,
        user: {
          _id: session?.user?.id,
          name: session?.user?.name || "You",
          email: session?.user?.email,
          image: session?.user?.image
        },
        userEmail: session?.user?.email,
        createdAt: new Date().toISOString()
      }

      setPosts(prevPosts => prevPosts.map(post =>
        post._id === postId ? {
          ...post,
          comments: [newComment, ...(post.comments || [])],
          commentCount: (post.commentCount || 0) + 1
        } : post
      ))

      setCommentInputs(prev => ({ ...prev, [postId]: '' }))

      // Submit to backend
      await fetch(`/api/posts/${postId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      })

      // Refresh to get actual comment ID from server
      fetchPosts()

      toast.success('Comment added!', {
        style: { background: '#1d3557', color: '#f1faee', border: '1px solid #457b9d' }
      })
    } catch {
      // Revert on error
      setPosts(prevPosts => prevPosts.map(post =>
        post._id === postId ? {
          ...post,
          comments: (post.comments || []).filter(c => c._id !== tempCommentId),
          commentCount: (post.commentCount || 0) - 1
        } : post
      ))

      toast.error('Failed to add comment', {
        style: { background: '#1d3557', color: '#f1faee', border: '1px solid #e63946' }
      })
    }
  }

  const handleDeleteComment = async (postId, commentId) => {
    try {
      // Optimistic UI update
      setPosts(prevPosts => prevPosts.map(post =>
        post._id === postId ? {
          ...post,
          comments: (post.comments || []).filter(c => c._id !== commentId),
          commentCount: (post.commentCount || 0) - 1
        } : post
      ))

      // Delete from backend
      const res = await fetch(`/api/posts/${postId}/comment/${commentId}`, {
        method: 'DELETE'
      })

      if (!res.ok) {
        throw new Error('Failed to delete comment')
      }

      toast.success('Comment deleted!', {
        style: { background: '#1d3557', color: '#f1faee', border: '1px solid #457b9d' }
      })
    } catch (err) {
      // Revert on error
      fetchPosts()
      toast.error('Failed to delete comment', {
        style: { background: '#1d3557', color: '#f1faee', border: '1px solid #e63946' }
      })
    }
  }

  const handleBookmark = async (postId) => {
    try {
      // Optimistic UI update
      setPosts(prevPosts => prevPosts.map(post =>
        post._id === postId ? {
          ...post,
          isBookmarked: !post.isBookmarked
        } : post
      ))

      const res = await fetch(`/api/users/bookmark`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId })
      })

      if (res.ok) {
        toast.success(post.isBookmarked ? "Removed from bookmarks!" : "Saved to bookmarks!", {
          style: { background: '#1d3557', color: '#f1faee', border: '1px solid #457b9d' }
        })
      } else {
        throw new Error("Failed to bookmark")
      }
    } catch (err) {
      // Revert on error
      setPosts(prevPosts => prevPosts.map(post =>
        post._id === postId ? {
          ...post,
          isBookmarked: !post.isBookmarked
        } : post
      ))

      toast.error(err.message, {
        style: { background: '#1d3557', color: '#f1faee', border: '1px solid #e63946' }
      })
    }
  }

  const toggleReadMore = (postId) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
  }

  const handleCommentChange = (postId, value) => {
    setCommentInputs(prev => ({
      ...prev,
      [postId]: value
    }))
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'featured', name: 'Featured' },
    { id: 'popular', name: 'Popular' },
    { id: 'recent', name: 'Recent' }
  ]

  return (
    <div className="min-h-screen bg-[#f1faee] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-[#1d3557] mb-3"
          >
            Community Stories
          </motion.h1>
          <p className="text-lg text-[#457b9d] max-w-2xl mx-auto">
            Discover and share inspiring content
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mt-8 mb-6"
          >
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category.id
                    ? 'bg-[#e63946] text-[#f1faee] shadow-md'
                    : 'bg-[#a8dadc] text-[#1d3557] hover:bg-[#457b9d] hover:text-[#f1faee]'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto"
          >
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-[#457b9d]" />
              </div>
              <input
                placeholder="Search for posts, topics, or authors..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#a8dadc] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e63946] focus:border-transparent text-[#1d3557] placeholder-[#457b9d]/70"
                onKeyPress={(e) => e.key === 'Enter' && fetchPosts()}
              />
            </div>
            <button
              onClick={fetchPosts}
              disabled={loading}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${loading ? 'bg-[#457b9d]/80' : 'bg-[#e63946] hover:bg-[#e63946]/90 text-[#f1faee] shadow-md hover:shadow-lg'
                }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-[#f1faee]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : 'Search'}
            </button>
          </motion.div>
        </div>

        {error && (
          <div className="text-center text-[#f1faee] bg-[#e63946] py-3 px-4 rounded-xl max-w-2xl mx-auto mb-8 font-medium">
            ⚠️ {error}
          </div>
        )}

        {posts.length === 0 && !loading && !error ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-md border border-[#a8dadc]">
              <h3 className="text-2xl font-semibold text-[#1d3557] mb-3">No posts found</h3>
              <p className="text-[#457b9d] mb-4">Try adjusting your search or explore different categories</p>
              <button
                onClick={() => {
                  setQuery('')
                  setActiveCategory('all')
                }}
                className="px-4 py-2 bg-[#e63946] text-[#f1faee] rounded-lg hover:bg-[#e63946]/90 transition-colors shadow-md"
              >
                Show all posts
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => {
              const content = post.content || '';
              const previewContent = content.split('\n').join(' ').slice(0, 120);
              const showReadMore = content.length > 120;
              const commentsVisible = expandedComments[post._id];

              return (
                <motion.div
                  key={post._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#a8dadc]"
                >
                  {post.imageUrl && (
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#1d3557]/70 to-transparent" />
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <Link href={`/posts/${post._id}`}>
                        <h2 className="text-xl font-bold text-[#1d3557] hover:text-[#e63946] transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                      </Link>
                      <span className="text-xs bg-[#a8dadc] text-[#1d3557] px-2 py-1 rounded-full ml-2">
                        {post.category || 'General'}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-[#457b9d] mb-3">
                      <FiClock className="mr-1" size={14} />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime || '5'} min read</span>
                    </div>

                    <div className="mb-4">
                      <p className="text-[#1d3557]/90 mb-2 leading-relaxed">
                        {expandedPosts[post._id] ? content : `${previewContent}${showReadMore ? '...' : ''}`}
                      </p>
                      {showReadMore && (
                        <button
                          onClick={() => toggleReadMore(post._id)}
                          className="text-sm text-[#e63946] hover:text-[#1d3557] font-medium flex items-center"
                        >
                          {expandedPosts[post._id] ? 'Show less' : 'Read more'}
                          <FiArrowRight className={`ml-1 transition-transform ${expandedPosts[post._id] ? 'rotate-90' : ''}`} size={14} />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-[#a8dadc] pt-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#457b9d] flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                          {post.user?.image ? (
                            <img src={post.user.image} alt={post.user.name} className="w-full h-full object-cover" />
                          ) : (
                            <FiUser className="text-[#f1faee]" size={16} />
                          )}
                        </div>
                        <div className="ml-3">
                          {/* <Link href={`/profile/${post.user?._id || ''}`}>
                            <p className="text-sm font-medium text-[#1d3557] hover:text-[#e63946] transition-colors">
                              {post.user?.name || 'Anonymous'}
                            </p>
                          </Link> */}
                          <p className="text-sm font-medium text-[#1d3557] hover:text-[#e63946] transition-colors">
                            {post.user?.name || 'Anonymous'}
                          </p>

                          <p className="text-xs text-[#457b9d]">@{post.user?.username || 'author'}</p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleLike(post._id)}
                          className="p-2 rounded-full hover:bg-[#f1faee]"
                          aria-label={post.isLiked ? 'Unlike' : 'Like'}
                        >
                          <div className="flex items-center">
                            <FiHeart
                              className={`${post.isLiked ? 'text-[#e63946] fill-[#e63946]' : 'text-[#457b9d]'} transition-colors`}
                              size={18}
                            />
                            <span className={`ml-1 text-sm ${post.isLiked ? 'text-[#e63946]' : 'text-[#457b9d]'}`}>
                              {post.likes?.length || 0}
                            </span>
                          </div>
                        </button>

                        <div className="flex items-center">
                          <button
                            onClick={() => toggleComments(post._id)}
                            className="p-2 rounded-full hover:bg-[#f1faee] flex items-center"
                            aria-label="Comment"
                          >
                            <FiMessageSquare
                              className={`${commentsVisible ? 'text-[#e63946]' : 'text-[#457b9d]'} transition-colors`}
                              size={18}
                            />
                          </button>
                          {post.commentCount > 0 && (
                            <button
                              onClick={() => toggleComments(post._id)}
                              className={`ml-1 text-sm ${commentsVisible ? 'text-[#e63946]' : 'text-[#457b9d]'}`}
                            >
                              {post.commentCount}
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => handleBookmark(post._id)}
                          className="p-2 rounded-full hover:bg-[#f1faee]"
                          aria-label={post.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                        >
                          <FiBookmark
                            className={`${post.isBookmarked ? 'text-[#e63946] fill-[#e63946]' : 'text-[#457b9d]'} transition-colors`}
                            size={18}
                          />
                        </button>
                      </div>
                    </div>

                    {commentsVisible && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 pt-3 border-t border-[#a8dadc]"
                      >
                        <div className="flex items-start gap-2 mb-3">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={commentInputs[post._id] || ''}
                              onChange={(e) => handleCommentChange(post._id, e.target.value)}
                              placeholder="Write a comment..."
                              className="w-full border border-[#a8dadc] rounded-full py-2 px-4 text-black text-sm focus:outline-none focus:ring-1 focus:ring-[#457b9d]"
                              onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(post._id)}
                            />
                          </div>
                          <button
                            onClick={() => handleCommentSubmit(post._id)}
                            className="bg-[#457b9d] text-white rounded-full p-2 hover:bg-[#1d3557] transition-colors"
                            aria-label="Post comment"
                          >
                            <FiSend size={16} />
                          </button>
                        </div>

                        {(post.comments?.length > 0) && (
                          <div className="max-h-64 overflow-y-auto pr-2 border-t border-[#a8dadc] pt-3 mt-3">
                            <h4 className="font-semibold text-[#1d3557] mb-2">Comments ({post.commentCount})</h4>
                            <div className="space-y-3">
                              {post.comments.map((comment) => {
                                const isCurrentUser = comment.userEmail === session?.user?.email;
                                return (
                                  <div key={comment._id} className="flex gap-2 group">
                                    <div className="flex-shrink-0">
                                      <div className="w-6 h-6 rounded-full bg-[#a8dadc] flex items-center justify-center overflow-hidden">
                                        {comment.user?.image ? (
                                          <img
                                            src={comment.user.image}
                                            alt={comment.user.name}
                                            className="w-full h-full object-cover"
                                          />
                                        ) : (
                                          <FiUser className="text-[#1d3557]" size={12} />
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex justify-between items-start">
                                        <p className="text-xs font-semibold text-[#1d3557]">
                                          {comment.user?.name || 'Anonymous'}
                                        </p>
                                        {isCurrentUser && (
                                          <button
                                            onClick={() => handleDeleteComment(post._id, comment._id)}
                                            className="text-[#e63946] opacity-0 group-hover:opacity-100 transition-opacity p-1"
                                            aria-label="Delete comment"
                                          >
                                            <FiTrash2 size={14} />
                                          </button>
                                        )}
                                      </div>
                                      <p className="text-sm text-[#1d3557]/90">{comment.content}</p>
                                      <p className="text-xs text-[#457b9d] mt-1">
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}