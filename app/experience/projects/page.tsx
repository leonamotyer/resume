"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Projects from "../Projects";
import Skills, { SkillsRef } from "../Skills";
import Header from "../../../components/Header";

export default function ProjectsPage() {
  const skillsRef = useRef<SkillsRef>(null);

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
            Projects
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Portfolio of Development Work
          </p>
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
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
    </main>
  );
}
