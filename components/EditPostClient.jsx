'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditPostClient({ postId }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`/api/posts/${postId}`);
      const data = await res.json();
      setTitle(data.post.title);
      setContent(data.post.content);
      setLoading(false);
    }

    fetchPost();
  }, [postId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert('Failed to update');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleUpdate} className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Edit Post</h2>
      <input
        className="w-full border p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        className="w-full border p-2 h-40"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
    </form>
  );
}
