"use client";

import { useEffect, useState } from "react";

export default function MessagesPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch("/api/users/comments");
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
      setLoading(false);
    };
    fetchComments();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">💬 Comments on Your Posts</h1>

      {loading ? (
        <p>Loading...</p>
      ) : comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment, idx) => (
            <li key={idx} className="p-4 border rounded-lg bg-white shadow-sm">
              <p className="text-sm text-gray-500 mb-1">
                On: <strong>{comment.postTitle}</strong>
              </p>
              <p>
                <strong>{comment.userEmail}</strong>: {comment.content}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
