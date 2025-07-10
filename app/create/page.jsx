


// pop up code after crete blog post 


'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast'; // ✅ Toast import

export default function CreatePost() {
  const router = useRouter();
  const titleInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'JavaScript',
    customCategory: '',
    imageUrl: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const getRandomImage = (category) =>
    `https://source.unsplash.com/600x400/?${category.toLowerCase()},technology&sig=${Math.floor(Math.random() * 1000)}`;

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        imageUrl: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const finalCategory =
      formData.category === 'Other'
        ? formData.customCategory.trim()
        : formData.category;

    if (!formData.title.trim()) {
      toast.error('Title is required');
      setLoading(false);
      return;
    }
    if (!formData.content.trim()) {
      toast.error('Content is required');
      setLoading(false);
      return;
    }
    if (!finalCategory) {
      toast.error('Category is required');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          category: finalCategory,
          imageUrl: formData.imageUrl || getRandomImage(finalCategory),
        }),
      });

      if (res.ok) {
        toast.success('🎉 Blog post published successfully!');
        router.push('/dashboard');
      } else {
        toast.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/dashboard" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <svg className="h-8 w-8 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M20 5l-8.586 8.586L9 15l.414-2.414L20 5z" />
              </svg>
              Create New Post
            </h1>
            <p className="text-indigo-200 mt-2">Share your knowledge with the community</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">Post Title</label>
              <input
                ref={titleInputRef}
                type="text"
                placeholder="What's your post about?"
                className={`w-full p-4 text-lg border-2 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  isFocused ? 'border-indigo-500 shadow-md' : 'border-gray-300 hover:border-gray-400'
                }`}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">Content</label>
              <textarea
                placeholder="Share your knowledge..."
                className="w-full p-4 h-48 border-2 border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300 hover:border-gray-400"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Category</label>
                <select
                  className="w-full p-3 border-2 text-black border-gray-300 rounded-xl bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300 hover:border-gray-400"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                      customCategory: '',
                    })
                  }
                >
                  <option value="JavaScript">JavaScript</option>
                  <option value="ReactJS">ReactJS</option>
                  <option value="NextJS">NextJS</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="NodeJS">NodeJS</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {formData.category === 'Other' && (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Custom Category</label>
                  <input
                    type="text"
                    placeholder="Enter your category"
                    className="w-full p-3 border-2 border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300 hover:border-gray-400"
                    value={formData.customCategory}
                    onChange={(e) =>
                      setFormData({ ...formData, customCategory: e.target.value })
                    }
                    required
                  />
                </div>
              )}
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">Cover Image</label>
              <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-6 text-center transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50">
                {formData.imageUrl ? (
                  <div className="relative">
                    <img src={formData.imageUrl} alt="Preview" className="w-full max-h-64 object-cover rounded-lg border border-gray-200 shadow-sm" />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                    />
                    <p className="text-gray-600 text-sm">
                      Upload an image or a random one will be used for "
                      {formData.category === 'Other'
                        ? formData.customCategory || 'your category'
                        : formData.category}
                      ".
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  Publish Post
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
