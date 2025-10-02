//Leona Motyer Resume
//Version 1.2025
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFileDownload,
} from "react-icons/fa";
import Header from "../components/Header";
import Link from "next/link";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-900">
            Leona Motyer
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 px-4">
            Platform Engineer & Software Developer
          </p>
          <div className="flex justify-center gap-4 sm:gap-6 mb-12 px-4">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/leonamotyer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl sm:text-2xl hover:text-amber-500 transition-colors p-2"
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://www.linkedin.com/in/leona-motyer/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl sm:text-2xl hover:text-amber-500 transition-colors p-2"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="mailto:leona@motyer.ca"
              className="text-xl sm:text-2xl hover:text-amber-500 transition-colors p-2"
              aria-label="Send Email"
            >
              <FaEnvelope />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="/LeonaMotyerResume.pdf"
              download
              className="text-xl sm:text-2xl hover:text-amber-500 transition-colors p-2"
              aria-label="Download Resume"
            >
              <FaFileDownload />
            </motion.a>
          </div>
          
          {/* Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-red-900/50 rounded-lg p-4 sm:p-6 hover:bg-red-900/70 transition-colors"
            >
              <Link href="/experience" className="block">
                <h3 className="text-lg sm:text-xl font-bold text-amber-500 mb-2">Experience & Education</h3>
                <p className="text-sm sm:text-base text-gray-300">Professional journey & academic background</p>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-red-900/50 rounded-lg p-4 sm:p-6 hover:bg-red-900/70 transition-colors"
            >
              <Link href="/experience/projects" className="block">
                <h3 className="text-lg sm:text-xl font-bold text-amber-500 mb-2">Projects</h3>
                <p className="text-sm sm:text-base text-gray-300">Portfolio of development work</p>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-red-900/50 rounded-lg p-4 sm:p-6 hover:bg-red-900/70 transition-colors"
            >
              <Link href="/experience/skills" className="block">
                <h3 className="text-lg sm:text-xl font-bold text-amber-500 mb-2">Skills</h3>
                <p className="text-sm sm:text-base text-gray-300">Technical expertise & technologies</p>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-red-900/50 rounded-lg p-4 sm:p-6 hover:bg-red-900/70 transition-colors"
            >
              <Link href="/recomendations" className="block">
                <h3 className="text-lg sm:text-xl font-bold text-amber-500 mb-2">Recommendations</h3>
                <p className="text-sm sm:text-base text-gray-300">Professional testimonials</p>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-red-900/50 rounded-lg p-4 sm:p-6 hover:bg-red-900/70 transition-colors"
            >
              <Link href="/about" className="block">
                <h3 className="text-lg sm:text-xl font-bold text-amber-500 mb-2">About</h3>
                <p className="text-sm sm:text-base text-gray-300">Get to know Leona Motyer</p>
              </Link>
            </motion.div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mt-8 px-4"
          >
            <Link 
              href="/contact"
              className="inline-block px-6 sm:px-8 py-3 bg-gradient-to-r from-amber-500 to-red-900 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-red-800 transition-all duration-300 text-sm sm:text-base"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
      </section>
    </main>
  );
}
