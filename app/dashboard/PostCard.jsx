'use client'

import { useRouter } from 'next/navigation'

export default function PostCard({ post }) {
  const router = useRouter()

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this post?')
    if (!confirmDelete) return

    try {
      const res = await fetch(`/api/posts/${post._id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.refresh() // Refreshes the page and updates the list
      } else {
        alert('Failed to delete post')
      }
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  return (
    <div className="border p-4 rounded mb-4 shadow-sm">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="text-gray-600 mb-2">{post.content.slice(0, 100)}...</p>
      <div className="flex gap-2">
        <button
          className="bg-green-600 text-white px-3 py-1 rounded"
          onClick={() => router.push(`/edit/${post._id}`)}
        >
          Edit
        </button>
        <button
          className="bg-red-600 text-white px-3 py-1 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
