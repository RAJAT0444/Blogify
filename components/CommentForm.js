"use client";
import { useState } from "react";

export default function CommentForm({ postId }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, content }),
    });

    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="my-4 space-y-2">
      <textarea
        className="w-full border p-2 rounded"
        rows="3"
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Comment
      </button>
    </form>
  );
}
