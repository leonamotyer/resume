//Leona Motyer Resume
//Version 1.2025
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import Experience from '../components/Experience';
import Skills, { SkillsRef } from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Recommendations from '../components/Recommendations';
import About from '../components/About';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const skillsRef = useRef<SkillsRef>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  useEffect(() => {
    setMounted(true);
    // Initialize EmailJS with your public key
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    
    setStatus({ submitting: true, submitted: false, error: null });

    try {
      const templateParams = {
        to_name: 'Leona',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email,
      };

      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        templateParams
      );

      if (result.status === 200) {
        setStatus({ submitting: false, submitted: true, error: null });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(`Failed to send message. Status: ${result.status}`);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({ 
        submitting: false, 
        submitted: false, 
        error: 'Failed to send message. Please check your connection and try again.' 
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Form field changed:', e.target.id, e.target.value);
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-900">
            Leona Motyer
          </h1>
          <p className="text-2xl text-gray-300 mb-8">Platform Engineer & Software Developer</p>
          <div className="flex justify-center gap-6">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/leonamotyer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-amber-500 transition-colors"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="https://www.linkedin.com/in/leona-motyer/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-amber-500 transition-colors"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="mailto:leona@motyer.ca"
              className="text-2xl hover:text-amber-500 transition-colors"
            >
              <FaEnvelope />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href="/LeonaMotyerResume.pdf"
              download
              className="text-2xl hover:text-amber-500 transition-colors"
            >
              <FaFileDownload />
            </motion.a>
          </div>
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
        
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-amber-500"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-12 text-center text-amber-500"
        >
          Experience
        </motion.h2>
        <Experience />
      </section>

      {/* Education Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-12 text-center text-amber-500"
        >
          Education
        </motion.h2>
        <Education />
      </section>

      {/* Animated Divider */}
      <motion.div 
        className="relative py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-24 h-24 rounded-full border-2 border-amber-500/20 flex items-center justify-center"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <motion.div 
              className="w-16 h-16 rounded-full border-2 border-amber-500/40"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [360, 180, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.div 
                className="w-8 h-8 rounded-full border-2 border-amber-500/60"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Projects Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-12 text-center text-amber-500"
        >
          Projects
        </motion.h2>
        <Projects skillsRef={skillsRef} />
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-12 text-center text-amber-500"
        >
          Skills
        </motion.h2>
        <Skills ref={skillsRef} />
      </section>

      {/* Recommendations Section */}
      <Recommendations />

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto bg-red-900/50">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-12 text-center text-amber-500"
        >
          Get in Touch
        </motion.h2>
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            {status.error && (
              <p className="text-red-500 text-sm">{status.error}</p>
            )}
            {status.submitted && (
              <p className="text-green-500 text-sm">Message sent successfully!</p>
            )}
            <motion.button
              type="submit"
              disabled={status.submitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 px-4 rounded-md bg-gradient-to-r from-amber-500 to-red-900 text-white font-medium hover:from-amber-600 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status.submitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </div>
      </section>
    </main>
  );
} 