





// // app/page.js
// import { FaPenAlt, FaChartLine, FaUsers, FaRocket, FaCheck } from 'react-icons/fa';

// export default function HomePage() {
//   return (
//     <div className="bg-white">
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-br from-indigo-900 to-purple-800 text-white pt-32 pb-36 overflow-hidden">
//         {/* Noise or pattern background */}
//         <div className="absolute inset-0 opacity-10 pointer-events-none">
//           <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20"></div>
//         </div>

//         {/* Hero Content */}
//         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
//             Craft Your Story, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-400">Share Your Voice</span>
//           </h1>
//           <p className="text-xl text-indigo-100 max-w-2xl mx-auto mt-6">
//             Blogify empowers writers with beautiful templates, powerful tools, and a community that cares about your content.
//           </p>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
//             <a href="/signup">
//               <button className="bg-gradient-to-r from-amber-400 to-pink-500 text-gray-900 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
//                 Start Writing Now
//               </button>
//             </a>
//             <button className="bg-white/10 text-white font-semibold px-8 py-4 rounded-full border border-white/20 hover:bg-white/20 transition">
//               Explore Features
//             </button>
//           </div>

//           {/* Social Proof */}
//           <div className="flex items-center justify-center pt-10 gap-4">
//             <div className="flex -space-x-3">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xs font-bold">
//                   {i}+
//                 </div>
//               ))}
//             </div>
//             <div className="text-indigo-100 text-left">
//               <p className="font-medium">Join 10,000+ creators</p>
//               <p className="text-sm opacity-80">Already sharing their stories</p>
//             </div>
//           </div>
//         </div>

//         {/* Bottom white fade */}
//         <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
//       </section>

//       {/* Trust Badges */}
//       <div className="max-w-7xl mx-auto px-6 py-8 -mt-16 relative z-20">
//         <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-gray-100">
//           {[
//             { name: "Active Writers", value: "10K+" },
//             { name: "Articles Published", value: "50K+" },
//             { name: "Monthly Readers", value: "2M+" },
//             { name: "Avg. Rating", value: "4.9/5" },
//           ].map((stat, i) => (
//             <div key={i} className={`px-4 ${i === 0 ? '' : 'pl-6'}`}>
//               <p className="text-2xl font-bold text-indigo-900">{stat.value}</p>
//               <p className="text-gray-500">{stat.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Features Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Succeed</span>
//             </h2>
//             <p className="text-xl text-gray-600">
//               Blogify combines powerful writing tools with beautiful design to help your content stand out.
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <FaPenAlt className="w-6 h-6 text-indigo-600" />,
//                 title: "Beautiful Templates",
//                 description: "Choose from dozens of professionally designed templates that make your writing shine.",
//                 color: "bg-indigo-50"
//               },
//               {
//                 icon: <FaChartLine className="w-6 h-6 text-pink-600" />,
//                 title: "Powerful Analytics",
//                 description: "Understand your audience with detailed analytics and reader engagement metrics.",
//                 color: "bg-pink-50"
//               },
//               {
//                 icon: <FaUsers className="w-6 h-6 text-amber-600" />,
//                 title: "Built-in Audience",
//                 description: "Get discovered by thousands of readers in our built-in community.",
//                 color: "bg-amber-50"
//               },
//               {
//                 icon: <FaRocket className="w-6 h-6 text-purple-600" />,
//                 title: "SEO Optimization",
//                 description: "Built-in tools to help your content rank higher in search results.",
//                 color: "bg-purple-50"
//               },
//               {
//                 icon: <FaCheck className="w-6 h-6 text-blue-600" />,
//                 title: "Simple Publishing",
//                 description: "One-click publishing to your custom domain or our platform.",
//                 color: "bg-blue-50"
//               },
//               {
//                 icon: <FaPenAlt className="w-6 h-6 text-green-600" />,
//                 title: "Collaboration Tools",
//                 description: "Invite editors and contributors to work on your content together.",
//                 color: "bg-green-50"
//               },
//             ].map((feature, i) => (
//               <div 
//                 key={i} 
//                 className={`p-8 rounded-xl ${feature.color} border border-transparent hover:border-white/20 transition-all hover:shadow-lg`}
//               >
//                 <div className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center mb-6">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center max-w-3xl mx-auto mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Writers</span>
//             </h2>
//             <p className="text-xl text-gray-600">
//               Don't just take our word for it. Here's what our community has to say.
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 name: "Sarah Johnson",
//                 role: "Travel Blogger",
//                 content: "Blogify transformed my writing workflow. The analytics helped me understand my audience better than ever before.",
//                 avatar: "/avatars/sarah.jpg"
//               },
//               {
//                 name: "Michael Chen",
//                 role: "Tech Writer",
//                 content: "The clean interface removes all distractions so I can focus on what matters - creating great content.",
//                 avatar: "/avatars/michael.jpg"
//               },
//               {
//                 name: "Elena Rodriguez",
//                 role: "Food Blogger",
//                 content: "My readership doubled within 2 months of switching to Blogify. The SEO tools are incredible.",
//                 avatar: "/avatars/elena.jpg"
//               }
//             ].map((testimonial, i) => (
//               <div 
//                 key={i} 
//                 className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
//               >
//                 <div className="flex items-center mb-6">
//                   <img 
//                     src={testimonial.avatar} 
//                     alt={testimonial.name}
//                     className="w-12 h-12 rounded-full object-cover mr-4"
//                   />
//                   <div>
//                     <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
//                     <p className="text-indigo-600">{testimonial.role}</p>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 italic">"{testimonial.content}"</p>
//                 <div className="flex mt-6">
//                   {[1,2,3,4,5].map((star) => (
//                     <svg key={star} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
//         <div className="max-w-4xl mx-auto px-6 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">
//             Ready to Start Your Blogging Journey?
//           </h2>
//           <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
//             Join thousands of writers who trust Blogify to share their stories with the world.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <button className="bg-gradient-to-r from-amber-400 to-pink-500 text-gray-900 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
//               Get Started - It's Free
//             </button>
//             <button className="bg-white/10 text-white font-semibold px-8 py-4 rounded-full border border-white/20 hover:bg-white/20 transition">
//               Schedule a Demo
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-400 py-10">
//   <div className="max-w-7xl mx-auto px-6 text-center">
//     <h3 className="text-white text-xl font-bold mb-4">Blogify</h3>
//     <p className="mb-2">A modern blogging platform focused on simplicity and content creation.</p>
//     <p className="mb-4 text-sm">Created by <span className="text-white font-semibold">Rajat Kumar</span></p>
//     <p className="mb-6 text-sm">📧 <a href="mailto:Rajatkumar6072@gmail.com" className="hover:text-white transition">Rajatkumar6072@gmail.com</a></p>
    
//     <div className="border-t border-gray-800 pt-6">
//       <p className="text-sm">&copy; {new Date().getFullYear()} Blogify. All rights reserved.</p>
//     </div>
//   </div>
// </footer>


//     </div>
//   );
// }











"use client";

import Image from "next/image";
import { FaPenAlt, FaChartLine, FaUsers, FaRocket, FaCheck } from "react-icons/fa";

export default function HomePage() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Travel Blogger",
      content:
        "Blogify transformed my writing workflow. The analytics helped me understand my audience better than ever before.",
      avatar: "/avatars/sarah.jpg",
    },
    {
      name: "Michael Chen",
      role: "Tech Writer",
      content:
        "The clean interface removes all distractions so I can focus on what matters - creating great content.",
      avatar: "/avatars/michael.jpg",
    },
    {
      name: "Elena Rodriguez",
      role: "Food Blogger",
      content:
        "My readership doubled within 2 months of switching to Blogify. The SEO tools are incredible.",
      avatar: "/avatars/elena.jpg",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 to-purple-800 text-white pt-32 pb-36 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Craft Your Story,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-400">
              Share Your Voice
            </span>
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mt-6">
            Blogify empowers writers with beautiful templates, powerful tools,
            and a community that cares about your content.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <a href="/signup">
              <button className="bg-gradient-to-r from-amber-400 to-pink-500 text-gray-900 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                Start Writing Now
              </button>
            </a>
            <button className="bg-white/10 text-white font-semibold px-8 py-4 rounded-full border border-white/20 hover:bg-white/20 transition">
              Explore Features
            </button>
          </div>
          <div className="flex items-center justify-center pt-10 gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xs font-bold"
                >
                  {i}+
                </div>
              ))}
            </div>
            <div className="text-indigo-100 text-left">
              <p className="font-medium">Join 10,000+ creators</p>
              <p className="text-sm opacity-80">Already sharing their stories</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-8 -mt-16 relative z-20">
        <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-gray-100">
          {[
            { name: "Active Writers", value: "10K+" },
            { name: "Articles Published", value: "50K+" },
            { name: "Monthly Readers", value: "2M+" },
            { name: "Avg. Rating", value: "4.9/5" },
          ].map((stat, i) => (
            <div key={i} className={`px-4 ${i === 0 ? "" : "pl-6"}`}>
              <p className="text-2xl font-bold text-indigo-900">{stat.value}</p>
              <p className="text-gray-500">{stat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Blogify combines powerful writing tools with beautiful design to
              help your content stand out.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaPenAlt className="w-6 h-6 text-indigo-600" />,
                title: "Beautiful Templates",
                description:
                  "Choose from dozens of professionally designed templates that make your writing shine.",
                color: "bg-indigo-50",
              },
              {
                icon: <FaChartLine className="w-6 h-6 text-pink-600" />,
                title: "Powerful Analytics",
                description:
                  "Understand your audience with detailed analytics and reader engagement metrics.",
                color: "bg-pink-50",
              },
              {
                icon: <FaUsers className="w-6 h-6 text-amber-600" />,
                title: "Built-in Audience",
                description:
                  "Get discovered by thousands of readers in our built-in community.",
                color: "bg-amber-50",
              },
              {
                icon: <FaRocket className="w-6 h-6 text-purple-600" />,
                title: "SEO Optimization",
                description:
                  "Built-in tools to help your content rank higher in search results.",
                color: "bg-purple-50",
              },
              {
                icon: <FaCheck className="w-6 h-6 text-blue-600" />,
                title: "Simple Publishing",
                description:
                  "One-click publishing to your custom domain or our platform.",
                color: "bg-blue-50",
              },
              {
                icon: <FaPenAlt className="w-6 h-6 text-green-600" />,
                title: "Collaboration Tools",
                description:
                  "Invite editors and contributors to work on your content together.",
                color: "bg-green-50",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`p-8 rounded-xl ${feature.color} border border-transparent hover:border-white/20 transition-all hover:shadow-lg`}
              >
                <div className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Writers
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Don&apos;t just take our word for it. Here&apos;s what our
              community has to say.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-indigo-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex mt-6">
                  {[...Array(5)].map((_, idx) => (
                    <svg
                      key={idx}
                      className="w-5 h-5 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Blogging Journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join thousands of writers who trust Blogify to share their stories
            with the world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-gradient-to-r from-amber-400 to-pink-500 text-gray-900 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
              Get Started - It&apos;s Free
            </button>
            <button className="bg-white/10 text-white font-semibold px-8 py-4 rounded-full border border-white/20 hover:bg-white/20 transition">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-white text-xl font-bold mb-4">Blogify</h3>
          <p className="mb-2">
            A modern blogging platform focused on simplicity and content
            creation.
          </p>
          <p className="mb-4 text-sm">
            Created by <span className="text-white font-semibold">Rajat Kumar</span>
          </p>
          <p className="mb-6 text-sm">
            📧{" "}
            <a
              href="mailto:Rajatkumar6072@gmail.com"
              className="hover:text-white transition"
            >
              Rajatkumar6072@gmail.com
            </a>
          </p>
          <div className="border-t border-gray-800 pt-6">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Blogify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
