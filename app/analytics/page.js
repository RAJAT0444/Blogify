// app/analytics/page.js


// 'use client'

// import { useEffect, useState } from 'react'
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
// } from 'recharts'

// export default function AnalyticsPage() {
//   const [stats, setStats] = useState({
//     totalPosts: 0,
//     totalUsers: 0,
//     totalComments: 0,
//     recentPosts: [],
//   });

//   const fetchAnalytics = async () => {
//     try {
//       const res = await fetch('/api/analytics');
//       const data = await res.json();
//       setStats(data);
//     } catch (err) {
//       console.error('Failed to fetch analytics:', err);
//     }
//   };

//   useEffect(() => {
//     fetchAnalytics();
//   }, []);

//   const chartData = [
//     { name: 'Posts', value: stats.totalPosts },
//     { name: 'Users', value: stats.totalUsers },
//     { name: 'Comments', value: stats.totalComments },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white p-6 md:p-10">
//       <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">📊 Analytics Dashboard</h1>

//       {/* Metric Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//         <div className="bg-white/10 backdrop-blur rounded-xl p-6">
//           <p className="text-indigo-200 text-sm mb-1">Total Posts</p>
//           <h2 className="text-2xl font-bold">{stats.totalPosts}</h2>
//         </div>
//         <div className="bg-white/10 backdrop-blur rounded-xl p-6">
//           <p className="text-indigo-200 text-sm mb-1">Total Users</p>
//           <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
//         </div>
//         <div className="bg-white/10 backdrop-blur rounded-xl p-6">
//           <p className="text-indigo-200 text-sm mb-1">Total Comments</p>
//           <h2 className="text-2xl font-bold">{stats.totalComments}</h2>
//         </div>
//       </div>

//       {/* 📈 Chart */}
//       <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-10">
//         <h3 className="text-xl font-semibold mb-4">📈 Overview Chart</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#aaa" />
//             <XAxis dataKey="name" stroke="#fff" />
//             <YAxis stroke="#fff" />
//             <Tooltip />
//             <Bar dataKey="value" fill="#a78bfa" radius={[10, 10, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* 📝 Recent Posts */}
//       <div className="bg-white/10 backdrop-blur rounded-xl p-6">
//         <h3 className="text-xl font-semibold mb-4">📝 Recent Posts</h3>
//         {stats.recentPosts.length === 0 ? (
//           <p className="text-indigo-200">No recent posts available.</p>
//         ) : (
//           <ul className="space-y-4">
//             {stats.recentPosts.map((post) => (
//               <li key={post._id} className="border-b border-indigo-400/20 pb-3">
//                 <p className="text-white font-medium">{post.title}</p>
//                 <p className="text-indigo-300 text-sm mb-1">By: {post.user?.name || 'Unknown'}</p>
//                 <div className="text-sm text-indigo-200">
//                   ❤️ {post.likesCount} likes ・ 💬 {post.commentsCount} comments
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }






















// // app/analytics/page.js
// 'use client'

// import { useEffect, useState } from 'react'
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
// } from 'recharts'
// import { motion } from 'framer-motion'
// import { FiUsers, FiMessageSquare, FiFileText, FiBarChart2 } from 'react-icons/fi'

// // Custom Tooltip Component
// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-black/80 backdrop-blur-lg rounded-lg p-4 border border-white/10 shadow-xl">
//         <p className="font-bold text-purple-300">{label}</p>
//         <p className="text-indigo-200">{payload[0].value} {label.toLowerCase()}</p>
//       </div>
//     )
//   }
//   return null
// }

// // Skeleton Loader
// const SkeletonLoader = () => (
//   <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-6 md:p-10">
//     <div className="animate-pulse">
//       <div className="h-10 bg-indigo-800/30 rounded w-1/4 mb-8 mx-auto"></div>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//         {[...Array(3)].map((_, i) => (
//           <div key={i} className="bg-white/10 rounded-xl p-6 h-32"></div>
//         ))}
//       </div>
      
//       <div className="bg-white/10 rounded-xl p-6 mb-10 h-80"></div>
      
//       <div className="bg-white/10 rounded-xl p-6">
//         <div className="h-6 bg-indigo-800/30 rounded w-1/4 mb-6"></div>
//         <div className="space-y-4">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="border-b border-indigo-400/20 pb-4">
//               <div className="h-4 bg-indigo-800/30 rounded w-3/4 mb-2"></div>
//               <div className="h-3 bg-indigo-800/30 rounded w-1/2 mb-2"></div>
//               <div className="h-3 bg-indigo-800/30 rounded w-1/3"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>
// )

// export default function AnalyticsPage() {
//   const [stats, setStats] = useState(null)
//   const [loading, setLoading] = useState(true)

//   const fetchAnalytics = async () => {
//     try {
//       const res = await fetch('/api/analytics')
//       const data = await res.json()
//       setStats(data)
//       setLoading(false)
//     } catch (err) {
//       console.error('Failed to fetch analytics:', err)
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchAnalytics()
//   }, [])

//   if (loading) return <SkeletonLoader />

//   const chartData = [
//     { name: 'Posts', value: stats.totalPosts },
//     { name: 'Users', value: stats.totalUsers },
//     { name: 'Comments', value: stats.totalComments },
//   ]

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   }

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.5, ease: "easeOut" }
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white p-6 md:p-10">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="text-center mb-10"
//       >
//         <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-300 inline-block">
//           <FiBarChart2 className="inline mr-3 mb-1" />
//           Analytics Dashboard
//         </h1>
//         <p className="text-indigo-300 mt-2">Track your platform performance</p>
//       </motion.div>

//       {/* Animated Metric Cards */}
//       <motion.div 
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <MetricCard 
//           title="Total Posts"
//           value={stats.totalPosts}
//           icon={<FiFileText className="w-6 h-6" />}
//           color="from-cyan-500 to-blue-500"
//           variants={itemVariants}
//         />
//         <MetricCard 
//           title="Total Users"
//           value={stats.totalUsers}
//           icon={<FiUsers className="w-6 h-6" />}
//           color="from-purple-500 to-pink-500"
//           variants={itemVariants}
//         />
//         <MetricCard 
//           title="Total Comments"
//           value={stats.totalComments}
//           icon={<FiMessageSquare className="w-6 h-6" />}
//           color="from-amber-500 to-orange-500"
//           variants={itemVariants}
//         />
//       </motion.div>

//       {/* Animated Chart */}
//       <motion.div
//         className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl mb-10"
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.3, duration: 0.5 }}
//       >
//         <h3 className="text-xl font-semibold mb-4 flex items-center">
//           <FiBarChart2 className="mr-2 text-cyan-300" />
//           Platform Overview
//         </h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#6b46c1" opacity={0.3} />
//             <XAxis 
//               dataKey="name" 
//               stroke="#c7d2fe" 
//               tick={{ fill: '#c7d2fe' }}
//             />
//             <YAxis 
//               stroke="#c7d2fe" 
//               tick={{ fill: '#c7d2fe' }}
//             />
//             <Tooltip content={<CustomTooltip />} />
//             <Bar 
//               dataKey="value" 
//               radius={[10, 10, 0, 0]}
//             >
//               {chartData.map((entry, index) => (
//                 <motion.rect
//                   key={`bar-${index}`}
//                   initial={{ height: 0 }}
//                   animate={{ height: '100%' }}
//                   transition={{ duration: 1, delay: index * 0.2 }}
//                   fill="url(#gradientBar)"
//                 />
//               ))}
//             </Bar>
//             <defs>
//               <linearGradient id="gradientBar" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor="#818cf8" />
//                 <stop offset="100%" stopColor="#c084fc" />
//               </linearGradient>
//             </defs>
//           </BarChart>
//         </ResponsiveContainer>
//       </motion.div>

//       {/* Recent Posts */}
//       <motion.div
//         className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 0.5 }}
//       >
//         <h3 className="text-xl font-semibold mb-4 flex items-center">
//           <FiFileText className="mr-2 text-amber-300" />
//           Recent Activity
//         </h3>
//         {stats.recentPosts.length === 0 ? (
//           <p className="text-indigo-300 italic">No recent activity found</p>
//         ) : (
//           <div className="space-y-4">
//             {stats.recentPosts.map((post) => (
//               <motion.div
//                 key={post._id}
//                 className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 rounded-xl p-4 hover:scale-[1.02] transition-all duration-300 border border-white/10"
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h4 className="font-medium text-cyan-100">{post.title}</h4>
//                     <p className="text-sm text-purple-300 mt-1">
//                       By: {post.user?.name || 'Unknown'}
//                     </p>
//                   </div>
//                   <div className="flex space-x-4">
//                     <span className="flex items-center text-sm text-pink-300">
//                       ❤️ {post.likesCount}
//                     </span>
//                     <span className="flex items-center text-sm text-amber-300">
//                       💬 {post.commentsCount}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="mt-3 flex items-center text-xs text-indigo-300">
//                   <span className="bg-indigo-800/50 px-2 py-1 rounded-full">
//                     {new Date(post.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </motion.div>
//     </div>
//   )
// }

// // Metric Card Component
// const MetricCard = ({ title, value, icon, color, variants }) => (
//   <motion.div
//     className={`bg-gradient-to-br ${color} rounded-2xl p-6 shadow-lg border border-white/10 overflow-hidden relative`}
//     variants={variants}
//     whileHover={{ y: -5 }}
//   >
//     <div className="absolute top-4 right-4 bg-white/20 p-3 rounded-full">
//       {icon}
//     </div>
//     <p className="text-indigo-100 text-sm mb-1">{title}</p>
//     <h2 className="text-3xl font-bold">{value}</h2>
//     <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
//       <motion.div 
//         className="h-full bg-white"
//         initial={{ width: 0 }}
//         animate={{ width: "100%" }}
//         transition={{ duration: 1, ease: "easeOut" }}
//       />
//     </div>
//   </motion.div>
// )

























'use client'

import { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import { motion } from 'framer-motion'
import { FiUsers, FiMessageSquare, FiFileText, FiBarChart2 } from 'react-icons/fi'

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 backdrop-blur-lg rounded-lg p-4 border border-white/10 shadow-xl">
        <p className="font-bold text-purple-300">{label}</p>
        <p className="text-indigo-200">{payload[0].value} {label.toLowerCase()}</p>
      </div>
    )
  }
  return null
}

// Skeleton Loader
const SkeletonLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-6 md:p-10">
    <div className="animate-pulse">
      <div className="h-10 bg-indigo-800/30 rounded w-1/4 mb-8 mx-auto"></div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white/10 rounded-xl p-6 h-32"></div>
        ))}
      </div>
      
      <div className="bg-white/10 rounded-xl p-6 mb-10 h-80"></div>
      
      <div className="bg-white/10 rounded-xl p-6">
        <div className="h-6 bg-indigo-800/30 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border-b border-indigo-400/20 pb-4">
              <div className="h-4 bg-indigo-800/30 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-indigo-800/30 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-indigo-800/30 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default function AnalyticsPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/analytics')
      const data = await res.json()
      setStats(data)
      setLoading(false)
    } catch (err) {
      console.error('Failed to fetch analytics:', err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  if (loading) return <SkeletonLoader />

  const chartData = [
    { name: 'Posts', value: stats.totalPosts },
    { name: 'Users', value: stats.totalUsers },
    { name: 'Comments', value: stats.totalComments },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-300 inline-block">
          <FiBarChart2 className="inline mr-3 mb-1" />
          Analytics Dashboard
        </h1>
        <p className="text-indigo-300 mt-2">Track your platform performance</p>
      </motion.div>

      {/* Metric Cards */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <MetricCard 
          title="Total Posts"
          value={stats.totalPosts}
          icon={<FiFileText className="w-6 h-6" />}
          color="from-cyan-500 to-blue-500"
          variants={itemVariants}
        />
        <MetricCard 
          title="Total Users"
          value={stats.totalUsers}
          icon={<FiUsers className="w-6 h-6" />}
          color="from-purple-500 to-pink-500"
          variants={itemVariants}
        />
        <MetricCard 
          title="Total Comments"
          value={stats.totalComments}
          icon={<FiMessageSquare className="w-6 h-6" />}
          color="from-amber-500 to-orange-500"
          variants={itemVariants}
        />
      </motion.div>

      {/* Colorful Bar Chart */}
      <motion.div
        className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl mb-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <FiBarChart2 className="mr-2 text-cyan-300" />
          Platform Overview
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#6b46c1" opacity={0.3} />
            <XAxis dataKey="name" stroke="#c7d2fe" tick={{ fill: '#c7d2fe' }} />
            <YAxis stroke="#c7d2fe" tick={{ fill: '#c7d2fe' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
              {chartData.map((entry, index) => {
                const gradients = ["url(#gradientPosts)", "url(#gradientUsers)", "url(#gradientComments)"]
                return (
                  <Cell key={`cell-${index}`} fill={gradients[index % gradients.length]} />
                )
              })}
            </Bar>
            <defs>
              <linearGradient id="gradientPosts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="gradientUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="gradientComments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Posts */}
      <motion.div
        className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <FiFileText className="mr-2 text-amber-300" />
          Recent Activity
        </h3>
        {stats.recentPosts.length === 0 ? (
          <p className="text-indigo-300 italic">No recent activity found</p>
        ) : (
          <div className="space-y-4">
            {stats.recentPosts.map((post) => (
              <motion.div
                key={post._id}
                className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 rounded-xl p-4 hover:scale-[1.02] transition-all duration-300 border border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-cyan-100">{post.title}</h4>
                    <p className="text-sm text-purple-300 mt-1">
                      By: {post.user?.name || 'Unknown'}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <span className="flex items-center text-sm text-pink-300">
                      ❤️ {post.likesCount}
                    </span>
                    <span className="flex items-center text-sm text-amber-300">
                      💬 {post.commentsCount}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs text-indigo-300">
                  <span className="bg-indigo-800/50 px-2 py-1 rounded-full">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

// Metric Card Component
const MetricCard = ({ title, value, icon, color, variants }) => (
  <motion.div
    className={`bg-gradient-to-br ${color} rounded-2xl p-6 shadow-lg border border-white/10 overflow-hidden relative`}
    variants={variants}
    whileHover={{ y: -5 }}
  >
    <div className="absolute top-4 right-4 bg-white/20 p-3 rounded-full">
      {icon}
    </div>
    <p className="text-indigo-100 text-sm mb-1">{title}</p>
    <h2 className="text-3xl font-bold">{value}</h2>
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
      <motion.div 
        className="h-full bg-white"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  </motion.div>
)













