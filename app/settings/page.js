

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

        {/* <div>
          <label className="block font-semibold mb-1">Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-full border"
            />
          )}
        </div> */}
        <div>
          <label className="block font-semibold mb-1">Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {previewUrl && (
            // eslint-disable-next-line @next/next/no-img-element
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
