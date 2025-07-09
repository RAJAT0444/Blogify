"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Animation on page load
    formRef.current.classList.add("animate-fade-in-up");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate API call with animation
    const button = e.target.querySelector("button[type='submit']");
    button.classList.add("loading");
    
    setTimeout(async () => {
      try {
        const res = await fetch("/api/signup", {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (res.ok) {
          // Success animation
          formRef.current.classList.add("animate-success");
          setTimeout(() => {
            router.push("/auth/login");
          }, 1500);
        } else {
          const data = await res.json();
          setError(data.error || "Signup failed. Please try again.");
          button.classList.remove("loading");
        }
      } catch (err) {
        setError("Network error. Please try again.");
        button.classList.remove("loading");
      } finally {
        setLoading(false);
      }
    }, 1200);
  };

  const nextStep = () => {
    if (step === 1 && form.name.trim() === "") {
      setError("Please enter your name");
      return;
    }
    if (step === 2 && form.email.trim() === "") {
      setError("Please enter a valid email");
      return;
    }
    setStep(step + 1);
    setError("");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute rounded-full"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              backgroundColor: `rgba(255,255,255,${Math.random() * 0.1})`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-500 opacity-0 translate-y-10"
      >
        <div className="text-center mb-8">
          <motion.div 
            className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto flex items-center justify-center mb-4"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Your Account</h1>
          <p className="text-indigo-200">Join our community today</p>
          
          {/* Progress indicator */}
          <div className="mt-6 flex justify-center space-x-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  step >= s ? "bg-cyan-400" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
        
        {error && (
          <motion.div 
            className="mb-6 bg-red-500/20 border border-red-500/40 rounded-lg p-3 text-red-100 text-sm flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </motion.div>
        )}
        
        <div className="space-y-5">
          {/* Step 1: Name */}
          <motion.div 
            className={`relative group ${step !== 1 ? 'opacity-50 pointer-events-none' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: step === 1 ? 1 : 0.5,
              y: step === 1 ? 0 : 20
            }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl px-5 py-4 pl-12 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white/20 placeholder:text-indigo-200 group-hover:bg-white/20"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </motion.div>
          
          {/* Step 2: Email */}
          <motion.div 
            className={`relative group ${step !== 2 ? 'opacity-50 pointer-events-none' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: step === 2 ? 1 : 0.5,
              y: step === 2 ? 0 : 20
            }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl px-5 py-4 pl-12 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white/20 placeholder:text-indigo-200 group-hover:bg-white/20"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </motion.div>
          
          {/* Step 3: Password */}
          <motion.div 
            className={`relative group ${step !== 3 ? 'opacity-50 pointer-events-none' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: step === 3 ? 1 : 0.5,
              y: step === 3 ? 0 : 20
            }}
            transition={{ duration: 0.3 }}
          >
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={6}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl px-5 py-4 pl-12 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white/20 placeholder:text-indigo-200 group-hover:bg-white/20"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-300 hover:text-white transition-colors duration-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              )}
            </button>
          </motion.div>
        </div>
        
        {/* Password strength indicator */}
        {step === 3 && form.password.length > 0 && (
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex mb-1">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className={`flex-1 h-1 mx-1 rounded-full transition-all duration-500 ${
                    form.password.length >= i * 3 ? 
                    (form.password.length >= 12 ? "bg-green-400" : 
                     form.password.length >= 9 ? "bg-cyan-400" : 
                     form.password.length >= 6 ? "bg-yellow-400" : "bg-red-400") 
                    : "bg-white/20"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-indigo-200 text-right">
              {form.password.length >= 12 ? "Strong password" : 
               form.password.length >= 9 ? "Good password" : 
               form.password.length >= 6 ? "Fair password" : "Weak password"}
            </p>
          </motion.div>
        )}
        
        <div className="mt-8">
          {step < 3 ? (
            <motion.button
              type="button"
              onClick={nextStep}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Continue
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-green-400 to-cyan-500 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">
                {loading ? "Creating account..." : "Sign Up"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-green-400 opacity-0 hover:opacity-100 transition-opacity duration-300 z-0"></div>
              <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
              
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                </div>
              )}
            </motion.button>
          )}
        </div>
        
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-white/20"></div>
          <span className="mx-4 text-indigo-200 text-sm">or sign up with</span>
          <div className="flex-grow border-t border-white/20"></div>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <button className="p-3 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
            </svg>
          </button>
          <button className="p-3 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </button>
          <button className="p-3 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.09-.193-7.715-2.157-10.141-5.126-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14v-.617c.961-.689 1.8-1.56 2.46-2.548z"/>
            </svg>
          </button>
        </div>
        
        <p className="mt-8 text-center text-sm text-indigo-200">
          Already have an account?{" "}
          <button 
            type="button" 
            className="text-cyan-300 font-medium hover:text-cyan-200 transition-colors duration-300"
            onClick={() => router.push("/auth/login")}
          >
            Log in
          </button>
        </p>
      </form>
      
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes successPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(56, 178, 172, 0.4);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(56, 178, 172, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(56, 178, 172, 0);
          }
        }
        
        .animate-success {
          animation: successPulse 2s ease-in-out;
        }
        
        button.loading span {
          opacity: 0;
        }
        button.loading::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          margin: -10px 0 0 -10px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          z-index: 20;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}