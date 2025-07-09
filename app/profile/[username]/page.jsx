'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function PublicProfilePage() {
  const { username } = useParams()
  const [author, setAuthor] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (!username) return

    // Fetch user info by username
    fetch(`/api/users/username/${username}`)
      .then(res => res.json())
      .then(data => {
        if (data?.name) setAuthor(data)
        else setAuthor(null)
      })
      .catch(err => {
        console.error('Error loading user:', err)
        setAuthor(null)
      })

    // Fetch posts by username
    fetch(`/api/posts/by-user?username=${username}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setPosts(data)
        else setPosts([])
      })
      .catch(err => {
        console.error('Error loading posts:', err)
        setPosts([])
      })
  }, [username])

  if (!author) return <p className="p-4">Loading profile...</p>

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <img src={author.avatar || '/default-avatar.png'} className="w-16 h-16 rounded-full" alt="avatar" />
        <div>
          <h1 className="text-2xl font-bold">@{author.name}</h1>
          <p className="text-gray-500">{author.email}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Posts by @{author.name}</h2>

      {posts.length === 0 ? (
        <p className="text-gray-600 italic">No posts found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map(post => (
            <div key={post._id} className="bg-white p-4 rounded shadow">
              {post.image && (
                <img src={post.image} className="w-full h-40 object-cover rounded mb-2" alt="post" />
              )}
              <Link href={`/post/${post._id}`}>
                <h3 className="text-lg font-semibold hover:underline">{post.title}</h3>
              </Link>
              <p className="text-gray-600 text-sm mt-1">❤️ {post.likes}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
