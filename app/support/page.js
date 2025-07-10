"use client";
import { useState } from "react";

export default function SupportPage() {
  const [formData, setFormData] = useState({ name: "", email: "", issueType: "", message: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("/api/complaints", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSuccess(true);
      setFormData({ name: "", email: "", issueType: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-indigo-400 p-4 md:p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <svg className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M5.636 5.636l3.536 3.536m5.656 0l3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="ml-2 text-2xl font-bold text-gray-800">Support Center</h1>
          </div>
          
          {success && (
            <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
              <p>Submitted successfully! Our team will get back to you soon.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-800">Name</label>
              <input
                id="name"
                name="name"
                placeholder="Your name"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                onChange={handleChange}
                value={formData.name}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div>
              <label htmlFor="issueType" className="block text-sm font-medium text-gray-800">Issue Type</label>
              <input
                id="issueType"
                name="issueType"
                placeholder="What's the issue about?"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                onChange={handleChange}
                value={formData.issueType}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-800">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Describe your issue in detail..."
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                rows="5"
                onChange={handleChange}
                value={formData.message}
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}