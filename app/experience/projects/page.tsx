"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Projects from "../Projects";
import Skills, { SkillsRef } from "../Skills";
import Header from "../../../components/Header";
import PageHero from "../../../components/PageHero";

export default function ProjectsPage() {
  const skillsRef = useRef<SkillsRef>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />

      <PageHero title="Projects" subtitle="Portfolio of Development Work" />

      {/* Projects Section */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <Projects skillsRef={skillsRef} />
      </section>

      {/* Skills Section */}
      <section className="mx-auto max-w-6xl px-4 py-12 pb-24 sm:py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center text-3xl font-bold text-amber-500 sm:mb-12 sm:text-4xl"
        >
          Skills
        </motion.h2>
        <Skills ref={skillsRef} />
      </section>
    </main>
  );
}
