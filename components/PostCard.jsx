


'use client'
import Link from 'next/link'
import {
  FiUser, FiHeart, FiMessageSquare, FiBookmark, 
  FiClock, FiArrowRight, FiSend, FiX
} from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function PostCard({
  post, index, expanded, onToggleExpand, onLike, onCommentSubmit,
  commentValue, onCommentChange, onBookmark, onToggleComments, commentsVisible
}) {
  // Safely handle content
  const content = post.content || '';
  const previewContent = content.split('\n').join(' ').slice(0, 120);
  const showReadMore = content.length > 120;

  return (
    <motion.div
      key={post._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#a8dadc]"
    >
      {post.imageUrl && (
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
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
            {expanded ? content : `${previewContent}${showReadMore ? '...' : ''}`}
          </p>
          {showReadMore && (
            <button
              onClick={onToggleExpand}
              className="text-sm text-[#e63946] hover:text-[#1d3557] font-medium flex items-center"
            >
              {expanded ? 'Show less' : 'Read more'}
              <FiArrowRight className={`ml-1 transition-transform ${expanded ? 'rotate-90' : ''}`} size={14} />
            </button>
          )}
        </div>

        <div className="flex justify-between border-t border-[#a8dadc] pt-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#457b9d] overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
              {post.user?.image ? (
                <img 
                  src={post.user.image} 
                  alt={post.user.name} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <FiUser className="text-white m-auto" size={16} />
              )}
            </div>
            <div className="ml-3">
              <Link href={`/profile/${post.user?._id || ''}`}>
                <p className="text-sm font-medium text-[#1d3557] hover:text-[#e63946] transition-colors">
                  {post.user?.name || 'Anonymous'}
                </p>
              </Link>
              <p className="text-xs text-[#457b9d]">@{post.user?.username || 'author'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <button 
                onClick={onLike} 
                className="p-1 hover:bg-[#f1faee] rounded-full"
                aria-label="Like post"
              >
                <FiHeart 
                  className={`${post.isLiked ? 'text-[#e63946] fill-[#e63946]' : 'text-[#457b9d]'}`} 
                  size={18} 
                />
              </button>
              {post.likes > 0 && (
                <span className="ml-1 text-sm text-[#457b9d]">
                  {post.likes}
                </span>
              )}
            </div>
            
            <div className="flex items-center">
              <button 
                onClick={onToggleComments} 
                className="p-1 hover:bg-[#f1faee] rounded-full flex items-center"
                aria-label="Toggle comments"
              >
                <FiMessageSquare 
                  className={`${commentsVisible ? 'text-[#e63946]' : 'text-[#457b9d]'}`} 
                  size={18} 
                />
                {post.commentCount > 0 && (
                  <span className="ml-1 text-sm text-[#457b9d]">
                    {post.commentCount}
                  </span>
                )}
              </button>
            </div>
            
            <button 
              onClick={onBookmark} 
              className="p-1 hover:bg-[#f1faee] rounded-full"
              aria-label="Save post"
            >
              <FiBookmark 
                className={`${post.isBookmarked ? 'text-[#e63946] fill-[#e63946]' : 'text-[#457b9d]'}`} 
                size={18} 
              />
            </button>
          </div>
        </div>

        {/* Combined comments section */}
        {commentsVisible && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 pt-3 border-t border-[#a8dadc]"
          >
            {/* Comment input */}
            <div className="flex items-center gap-2 mb-4">
              <input
                value={commentValue}
                onChange={(e) => onCommentChange(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 border border-[#a8dadc] rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#457b9d]"
                onKeyPress={(e) => e.key === 'Enter' && onCommentSubmit()}
              />
              <button 
                onClick={onCommentSubmit} 
                className="bg-[#457b9d] text-white rounded-full p-2 hover:bg-[#1d3557] transition-colors"
                aria-label="Submit comment"
              >
                <FiSend size={16} />
              </button>
            </div>

            {/* Existing comments */}
            {post.commentCount > 0 && (
              <div className="max-h-40 overflow-y-auto pr-2 border-t border-[#a8dadc] pt-3">
                <h4 className="font-semibold text-[#1d3557] mb-2">Comments ({post.commentCount})</h4>
                <div className="space-y-3">
                  {post.comments.map((comment) => (
                    <div key={comment._id} className="flex gap-2">
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
                        <p className="text-xs font-semibold text-[#1d3557]">
                          {comment.user?.name || 'Anonymous'}
                        </p>
                        <p className="text-sm text-[#1d3557]/90">{comment.text}</p>
                        <p className="text-xs text-[#457b9d] mt-1">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Close comments button */}
            <button
              onClick={onToggleComments}
              className="mt-3 w-full py-2 bg-[#f1faee] text-[#e63946] rounded-lg font-medium hover:bg-[#e63946] hover:text-white transition-colors"
            >
              Close comments
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}