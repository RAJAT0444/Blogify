'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditPostClient({ postId }) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${postId}`)
        const data = await res.json()
        if (data.post) {
          setTitle(data.post.title)
          setContent(data.post.content)
        }
      } catch (error) {
        console.error('Error loading post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [postId])

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      })

      if (res.ok) {
        router.push('/dashboard')
      } else {
        alert('Update failed')
      }
    } catch (error) {
      console.error('Update error:', error)
    }
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="w-full border p-2 rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Post
        </button>
      </form>
    </div>
  )
}
