// // app/profile/page.jsx
// 'use client'

// import { useSession } from 'next-auth/react'
// import { useEffect, useState } from 'react'
// import Link from 'next/link'

// export default function AuthorProfilePage() {
//   const { data: session, status } = useSession()
//   const [author, setAuthor] = useState(null)
//   const [posts, setPosts] = useState([])

//   useEffect(() => {
//     if (!session?.user?.email) return

//     const email = session.user.email

//     // Fetch author data by email
//     fetch(`/api/users/email/${email}`)
//       .then(res => res.json())
//       .then(data => setAuthor(data))
//       .catch(err => console.error('Error fetching user:', err))

//     // Fetch posts by email
//     fetch(`/api/posts/user?email=${email}`)
//       .then(res => res.json())
//       .then(data => {
//         if (Array.isArray(data)) setPosts(data)
//         else setPosts([])
//       })
//       .catch(err => console.error('Error fetching posts:', err))
//   }, [session])

//   if (status === 'loading') return <p className="p-4">Loading...</p>
//   if (!session) return <p className="p-4">Please log in to view your profile.</p>
//   if (!author) return <p className="p-4">Loading profile...</p>

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex items-center gap-4 mb-6">
//         <img src={author.avatar || '/default-avatar.png'} className="w-16 h-16 rounded-full" alt="Avatar" />
//         <div>
//           <h1 className="text-2xl font-bold">@{author.name}</h1>
//           <p className="text-gray-600">{author.email}</p>
//           <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded">
//             Message
//           </button>
//         </div>
//       </div>

//       <h2 className="text-xl font-semibold mb-4">Your Posts</h2>

//       {posts.length === 0 ? (
//         <p className="text-gray-600 italic">You haven't posted anything yet.</p>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2">
//           {posts.map(post => (
//             <div key={post._id} className="bg-white p-4 rounded shadow">
//               {post.image && (
//                 <img
//                   src={post.image}
//                   alt="Post"
//                   className="w-full h-40 object-cover rounded mb-2"
//                 />
//               )}
//               <Link href={`/post/${post._id}`}>
//                 <h3 className="text-lg font-semibold hover:underline">{post.title}</h3>
//               </Link>
//               <p className="text-gray-600 text-sm mt-1">❤️ {post.likes}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }












'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
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
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-40 object-cover mt-2 rounded"
                  onError={e => (e.target.style.display = 'none')}
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
