

'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function ProfilePage() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState([])
  const [author, setAuthor] = useState({})

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/users/email/${session.user.email}`)
        .then(res => res.json())
        .then(data => setAuthor(data.user || data.author))

      fetch(`/api/posts/user?email=${session.user.email}`)
        .then(res => res.json())
        .then(setPosts)
    }
  }, [session?.user?.email])

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      <div className="mb-6 border p-4 rounded shadow">
        <p><strong>Name:</strong> {author?.name}</p>
        <p><strong>Email:</strong> {author?.email}</p>
        <p><strong>Bio:</strong> {author?.bio}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-3">My Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map(post => (
            <div key={post._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-bold">{post.title}</h3>
              {post.image && (
                // <img
                //   src={post.image}
                //   alt=""
                //   className="w-full h-40 object-cover mt-2 rounded"
                //   onError={e => (e.target.style.display = 'none')}
                // />
                <Image
                  src={post.image}
                  alt="Post image"
                  fill
                  className="object-cover"
                  onError={() => setShowImage(false)}
                />
              )}
              <p className="mt-2">{post.content}</p>
              <Link
                href={`/edit/${post._id}`}
                className="inline-block mt-3 text-blue-600 hover:underline"
              >
                Edit Post
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
