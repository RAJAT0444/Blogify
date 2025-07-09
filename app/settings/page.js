// // app/settings/page.js

// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { FiUpload, FiX, FiUser, FiLock, FiSave } from 'react-icons/fi';

// export default function Settings() {
//   const { data: session } = useSession();
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     name: '',
//     password: '',
//     image: null,
//   });

//   const [previewUrl, setPreviewUrl] = useState('');
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (session?.user) {
//       setFormData(prev => ({
//         ...prev,
//         name: session.user.name || '',
//       }));
//       setPreviewUrl(session.user.image || '');
//     }
//   }, [session]);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = e => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({ ...prev, image: file }));
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleRemoveImage = () => {
//     setFormData(prev => ({ ...prev, image: null }));
//     setPreviewUrl('');
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setMessage({ text: '', type: '' });
//     setIsLoading(true);

//     try {
//       if (!session?.user?.email) throw new Error('User session not ready');

//       const formPayload = new FormData();
//       formPayload.append('email', session.user.email);
//       formPayload.append('name', formData.name);
//       if (formData.password) formPayload.append('password', formData.password);
//       if (formData.image) formPayload.append('image', formData.image);

//       const res = await fetch('/api/users/update', {
//         method: 'PATCH',
//         body: formPayload,
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || 'Failed to update profile');
//       }

//       router.refresh();

//       setMessage({ text: 'Profile updated successfully!', type: 'success' });
//       setFormData(prev => ({ ...prev, password: '' }));
//     } catch (err) {
//       setMessage({ text: err.message || 'Update failed', type: 'error' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
//       <div className="p-8">
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
//           <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 flex-1 ml-4"></div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Name Field */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">Name</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex text-black items-center pointer-events-none">
//                 <FiUser className="text-gray-400 " />
//               </div>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="block w-full pl-10 pr-3 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                 required
//                 minLength={2}
//               />
//             </div>
//           </div>

//           {/* Password Field */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 text-black flex items-center pointer-events-none">
//                 <FiLock className="text-gray-400" />
//               </div>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="block w-full pl-10 pr-3 py-2 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//                 placeholder="Leave blank to keep current"
//                 minLength={6}
//               />
//             </div>
//           </div>

//           {/* Profile Image Upload */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">Profile Image</label>
//             <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition duration-200 hover:border-blue-400">
//               {previewUrl ? (
//                 <div className="relative group">
//                   <img
//                     src={previewUrl}
//                     alt="Preview"
//                     className="w-32 h-32 mx-auto rounded-full object-cover shadow-md group-hover:opacity-90 transition duration-200"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleRemoveImage}
//                     className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-200 transform hover:scale-110"
//                   >
//                     <FiX size={16} />
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center space-y-3">
//                   <input
//                     type="file"
//                     id="image-upload"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="hidden"
//                   />
//                   <label
//                     htmlFor="image-upload"
//                     className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md cursor-pointer hover:from-blue-600 hover:to-blue-700 transition duration-200"
//                   >
//                     <FiUpload className="mr-2" />
//                     Choose Image
//                   </label>
//                   <p className="text-xs text-gray-500">JPG, PNG or GIF (max. 5MB)</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium shadow-md ${
//               isLoading
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
//             } transition duration-200 transform hover:scale-[1.02]`}
//           >
//             {isLoading ? (
//               'Saving...'
//             ) : (
//               <>
//                 <FiSave className="mr-2" />
//                 Save Changes
//               </>
//             )}
//           </button>

//           {/* Message Alert */}
//           {message.text && (
//             <div
//               className={`p-4 rounded-lg shadow-sm ${
//                 message.type === 'success'
//                   ? 'bg-green-50 text-green-800 border border-green-200'
//                   : 'bg-red-50 text-red-800 border border-red-200'
//               } transition duration-200 animate-fade-in`}
//             >
//               {message.text}
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }
















'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const { data: session } = useSession()
  const [formData, setFormData] = useState({ name: '', bio: '', image: '' })
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/users/email/${session.user.email}`)
        .then(res => res.json())
        .then(data => {
          const user = data.user || data.author
          setFormData({
            name: user.name || '',
            bio: user.bio || '',
            image: user.image || ''
          })
          setPreviewUrl(user.image || '')
        })
    }
  }, [session?.user?.email])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = e => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB')
      return
    }

    setFormData(prev => ({ ...prev, image: file }))
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const body = new FormData()
    body.append('name', formData.name)
    body.append('bio', formData.bio)
    if (formData.image instanceof File) {
      body.append('image', formData.image)
    }

    const res = await fetch('/api/users/update', {
      method: 'POST',
      body
    })

    if (res.ok) {
      toast.success('Profile updated')
    } else {
      toast.error('Failed to update')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Account Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border px-4 py-2 rounded"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Bio</label>
          <textarea
            name="bio"
            className="w-full border px-4 py-2 rounded"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-full border"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Save Settings
        </button>
      </form>
    </div>
  )
}
