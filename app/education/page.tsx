"use client";

import { motion } from "framer-motion";
import Education from "./Education";
import Header from "../../components/Header";

export default function EducationPage() {
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
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-900">
            Education
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Academic Background & Achievements
          </p>
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
      </section>

      {/* Education Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <Education />
      </section>
    </main>
  );
}
