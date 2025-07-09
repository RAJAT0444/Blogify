// 'use client';

// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function PostList({ posts }) {
//   const router = useRouter();

//   const handleDelete = async (id) => {
//     const confirm = window.confirm("Are you sure you want to delete?");
//     if (!confirm) return;

//     const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
//     if (res.ok) router.refresh();
//     else alert("Delete failed");
//   };

//   return (
//     <div className="space-y-4">
//       {posts.map((post) => (
//         <div key={post._id} className="border p-4 rounded shadow-sm">
//           <h2 className="text-lg font-bold">{post.title}</h2>
//           <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
//           <div className="mt-2 space-x-2">
//             <Link href={`/edit/${post._id}`} className="text-blue-600">Edit</Link>
//             <button onClick={() => handleDelete(post._id)} className="text-red-600">Delete</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }





















'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { FiMessageCircle } from 'react-icons/fi';

export default function PostList({ posts }) {
  const router = useRouter();
  const [openComments, setOpenComments] = useState(null); // post._id

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    if (res.ok) router.refresh();
    else alert("Delete failed");
  };

  const toggleComments = (postId) => {
    setOpenComments(openComments === postId ? null : postId);
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post._id} className="border p-4 rounded shadow-sm bg-white">
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p className="text-gray-700">{post.content.slice(0, 100)}...</p>

          <div className="mt-2 space-x-4 flex items-center">
            <Link href={`/edit/${post._id}`} className="text-blue-600">Edit</Link>
            <button onClick={() => handleDelete(post._id)} className="text-red-600">Delete</button>

            <button
              onClick={() => toggleComments(post._id)}
              className="text-gray-600 flex items-center space-x-1"
            >
              <FiMessageCircle />
              <span className="text-sm">{post.comments?.length || 0}</span>
            </button>
          </div>

          {/* Comment Box & List */}
          {openComments === post._id && (
            <div className="mt-4 space-y-3 border-t pt-3">
              <CommentForm postId={post._id} />
              <CommentList comments={post.comments} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Comment Form
function CommentForm({ postId }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const submitComment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/posts/${postId}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      setContent('');
      window.location.reload(); // or better: refresh just this post
    } else {
      alert('Failed to comment');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={submitComment} className="space-y-2">
      <textarea
        rows="2"
        className="w-full border rounded p-2"
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1 rounded text-sm"
        disabled={loading}
      >
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}

// Comment List
function CommentList({ comments = [] }) {
  if (comments.length === 0) return <p className="text-sm text-gray-500">No comments yet.</p>;

  return (
    <ul className="space-y-2 text-sm">
      {comments.map((comment, i) => (
        <li key={i} className="border rounded px-3 py-2 bg-gray-50">
          <p className="font-medium text-gray-800">{comment.userEmail}</p>
          <p className="text-gray-700">{comment.content}</p>
          <p className="text-gray-400 text-xs">{new Date(comment.createdAt).toLocaleString()}</p>
        </li>
      ))}
    </ul>
  );
}
