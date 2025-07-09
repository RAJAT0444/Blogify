
// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams, useRouter } from 'next/navigation'

// export default function EditPostPage() {
//   const { id } = useParams()
//   const router = useRouter()

//   const [post, setPost] = useState(null)
//   const [title, setTitle] = useState('')
//   const [content, setContent] = useState('')
//   const [image, setImage] = useState('')
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await fetch(`/api/posts/${id}`)
//         const data = await res.json()

//         if (res.ok) {
//           setPost(data.post)
//           setTitle(data.post.title)
//           setContent(data.post.content)
//           setImage(data.post.image || '')
//         } else {
//           console.error(data.error)
//         }
//       } catch (err) {
//         console.error('Error fetching post:', err)
//       }
//     }

//     if (id) fetchPost()
//   }, [id])

//   const handleUpdate = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const res = await fetch(`/api/posts/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title, content, image }),
//       })

//       if (res.ok) {
//         alert('Post updated successfully!')
//         router.push('/dashboard') // redirect back to dashboard
//       } else {
//         alert('Failed to update post.')
//       }
//     } catch (err) {
//       console.error('Update error:', err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!post) return <div className="p-6 text-white">Loading post...</div>

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-8 text-white">
//       <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
//       <form onSubmit={handleUpdate} className="space-y-4 max-w-xl">
//         <div>
//           <label className="block mb-2">Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 rounded text-black"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Content:</label>
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             rows={6}
//             className="w-full p-2 rounded text-black"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2">Image URL (optional):</label>
//           <input
//             type="text"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//             className="w-full p-2 rounded text-black"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded"
//         >
//           {loading ? 'Updating...' : 'Update Post'}
//         </button>
//       </form>
//     </div>
//   )
// }









'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FiArrowLeft, FiSave, FiImage, FiLoader } from 'react-icons/fi'
import { toast } from 'react-hot-toast'

export default function EditPostPage() {
  const { id } = useParams()
  const router = useRouter()

  const [post, setPost] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: ''
  })
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`)
        const data = await res.json()

        if (res.ok) {
          setPost(data.post)
          setFormData({
            title: data.post.title,
            content: data.post.content,
            image: data.post.image || ''
          })
        } else {
          toast.error(data.error || 'Failed to fetch post')
        }
      } catch (err) {
        toast.error('Error fetching post')
        console.error('Error:', err)
      } finally {
        setIsFetching(false)
      }
    }

    if (id) fetchPost()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        toast.success('Post updated successfully!')
        router.push('/dashboard')
      } else {
        const errorData = await res.json()
        toast.error(errorData.error || 'Failed to update post')
      }
    } catch (err) {
      toast.error('Network error occurred')
      console.error('Update error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (isFetching) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <FiLoader className="animate-spin text-4xl text-indigo-600" />
        <p className="text-gray-600">Loading post...</p>
      </div>
    </div>
  )

  if (!post) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-6 max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Post Not Found</h2>
        <p className="text-gray-600 mb-4">The post you're trying to edit doesn't exist or may have been deleted.</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mr-4"
          >
            <FiArrowLeft className="mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Edit Post</h1>
        </div>

        <form onSubmit={handleUpdate} className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={8}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Write your post content here..."
              required
            />
          </div>


           {/* image url code to also given asses of image uplaod again  */}


          {/* <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <FiImage className="mr-2" />
              Image URL (optional)
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://example.com/image.jpg"
            />
            {formData.image && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Image Preview:</p>
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="max-w-full h-auto rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            )}
          </div> */}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-70"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" />
                  Update Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}