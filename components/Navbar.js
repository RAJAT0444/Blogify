// 'use client';

// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import { Menu, X } from 'lucide-react';
// import { useEffect, useState } from 'react';

// export default function Navbar() {
//   const router = useRouter();
//   const { data: session } = useSession();

//   const [isScrolled, setIsScrolled] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   return (
//     <>
//       {/* Navbar */}
//       <nav
//         className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//           isScrolled
//             ? 'backdrop-blur-md bg-blue-500/60 shadow-lg'
//             : 'bg-gray-900'
//         } text-white px-6 py-4`}
//       >
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           {/* Logo */}
//           <h1
//             className="text-2xl font-bold cursor-pointer hover:text-blue-200 transition"
//             onClick={() => router.push('/')}
//           >
//             Blogify ✍️
//           </h1>

//           {/* Hamburger for Mobile */}
//           <button className="md:hidden z-50" onClick={toggleSidebar}>
//             {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>

//           {/* User session - Desktop only */}
//           {session ? (
//             <div className="hidden md:flex items-center bg-gray-800 px-3 py-1 rounded-full text-sm font-medium">
//               👤 {session.user?.name || 'User'}
//             </div>
//           ) : (
//             <div className="hidden md:flex items-center space-x-4">
//               <button
//                 onClick={() => {
//                   console.log('Login clicked');
//                   router.push('/auth/login');
//                 }}
//                 className="text-sm font-medium hover:text-blue-300 transition"
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => router.push('/auth/signup')}
//                 className="text-sm font-medium hover:text-green-300 transition"
//               >
//                 Signup
//               </button>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Sidebar overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 transform transition-transform duration-300 ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } md:hidden pt-20 px-6`}
//       >
//         <ul className="space-y-6 text-lg">
//           <li
//             className="cursor-pointer hover:text-blue-300 transition"
//             onClick={() => {
//               toggleSidebar();
//               router.push('/');
//             }}
//           >
//             🏠 Home
//           </li>
//           {session ? (
//             <li
//               className="cursor-pointer hover:text-blue-300 transition"
//               onClick={() => {
//                 toggleSidebar();
//                 router.push('/dashboard');
//               }}
//             >
//               📋 Dashboard
//             </li>
//           ) : (
//             <>
//               <li
//                 className="cursor-pointer hover:text-blue-300 transition"
//                 onClick={() => {
//                   toggleSidebar();
//                   router.push('/auth/login');
//                 }}
//               >
//                 🔐 Login
//               </li>
//               <li
//                 className="cursor-pointer hover:text-green-300 transition"
//                 onClick={() => {
//                   toggleSidebar();
//                   router.push('/auth/signup');
//                 }}
//               >
//                 📝 Signup
//               </li>
//             </>
//           )}
//         </ul>
//       </div>
//     </>
//   );
// }









// 'use client';

// import { useRouter } from 'next/navigation';
// import { signOut, useSession } from 'next-auth/react';
// import { Menu, X } from 'lucide-react';
// import { useEffect, useState } from 'react';

// export default function Navbar() {
//   const router = useRouter();
//   const { data: session } = useSession();

//   const [isScrolled, setIsScrolled] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   const handleLogout = async () => {
//     await signOut({ callbackUrl: '/' }); // Redirect to home after logout
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <nav
//         className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//           isScrolled
//             ? 'backdrop-blur-md bg-blue-500/60 shadow-lg'
//             : 'bg-gray-900'
//         } text-white px-6 py-4`}
//       >
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           {/* Logo */}
//           <h1
//             className="text-2xl font-bold cursor-pointer hover:text-blue-200 transition"
//             onClick={() => router.push('/')}
//           >
//             Blogify ✍️
//           </h1>

//           {/* Hamburger for Mobile */}
//           <button className="md:hidden z-50" onClick={toggleSidebar}>
//             {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>

//           {/* User session - Desktop only */}
//           {session ? (
//             <div className="hidden md:flex items-center space-x-4">
//               <span className="bg-gray-800 px-3 py-1 rounded-full text-sm font-medium">
//                 👤 {session.user?.name || 'User'}
//               </span>
//               <button
//                 onClick={handleLogout}
//                 className="text-sm font-medium hover:text-red-300 transition"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="hidden md:flex items-center space-x-4">
//               <button
//                 onClick={() => router.push('/auth/login')}
//                 className="text-sm font-medium hover:text-blue-300 transition"
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => router.push('/auth/signup')}
//                 className="text-sm font-medium hover:text-green-300 transition"
//               >
//                 Signup
//               </button>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Sidebar overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 transform transition-transform duration-300 ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } md:hidden pt-20 px-6`}
//       >
//         <ul className="space-y-6 text-lg">
//           <li
//             className="cursor-pointer hover:text-blue-300 transition"
//             onClick={() => {
//               toggleSidebar();
//               router.push('/');
//             }}
//           >
//             🏠 Home
//           </li>

//           {session ? (
//             <>
//               <li
//                 className="cursor-pointer hover:text-blue-300 transition"
//                 onClick={() => {
//                   toggleSidebar();
//                   router.push('/dashboard');
//                 }}
//               >
//                 📋 Dashboard
//               </li>
//               <li
//                 className="cursor-pointer hover:text-red-300 transition"
//                 onClick={() => {
//                   toggleSidebar();
//                   handleLogout();
//                 }}
//               >
//                 🚪 Logout
//               </li>
//             </>
//           ) : (
//             <>
//               <li
//                 className="cursor-pointer hover:text-blue-300 transition"
//                 onClick={() => {
//                   toggleSidebar();
//                   router.push('/auth/login');
//                 }}
//               >
//                 🔐 Login
//               </li>
//               <li
//                 className="cursor-pointer hover:text-green-300 transition"
//                 onClick={() => {
//                   toggleSidebar();
//                   router.push('/auth/signup');
//                 }}
//               >
//                 📝 Signup
//               </li>
//             </>
//           )}
//         </ul>
//       </div>
//     </>
//   );
// }


















'use client';

import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar'; // ✅ Make sure the path is correct

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-md bg-blue-500/60 shadow-lg'
            : 'bg-gray-900'
        } text-white px-6 py-4`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1
            className="text-2xl font-bold cursor-pointer hover:text-blue-200 transition"
            onClick={() => router.push('/')}
          >
            Blogify ✍️
          </h1>

          {/* Hamburger for Mobile */}
          <button className="md:hidden z-50" onClick={toggleSidebar}>
            {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* User session - Desktop only */}
          {session ? (
            <div className="hidden md:flex items-center space-x-4">
              <span className="bg-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                👤 {session.user?.name || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium hover:text-red-300 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => router.push('/auth/login')}
                className="text-sm font-medium hover:text-blue-300 transition"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/auth/signup')}
                className="text-sm font-medium hover:text-green-300 transition"
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile Sidebar with full Sidebar component */}
      {sidebarOpen && (
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
    </>
  );
}
