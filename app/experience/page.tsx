"use client";

import { motion } from "framer-motion";
import Experience from "./Experience";
import Education from "./education/Education";
import Header from "../../components/Header";

export default function ExperiencePage() {
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
            Experience & Education
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 px-4">
            Professional Journey & Academic Background
          </p>
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
      </section>

      {/* Experience Section */}
      <section className="py-16 sm:py-20 px-4 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-amber-500"
        >
          Experience
        </motion.h2>
        <Experience />
      </section>

      {/* Education Section */}
      <section className="py-16 sm:py-20 px-4 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-amber-500"
        >
          Education
        </motion.h2>
        <Education />
      </section>
    </main>
  );
}
