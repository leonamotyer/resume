"use client";

import { useRef } from "react";
import Skills, { SkillsRef } from "../Skills";
import Header from "../../../components/Header";
import PageHero from "../../../components/PageHero";

export default function SkillsPage() {
  const skillsRef = useRef<SkillsRef>(null);

  return (
    <main className="min-h-screen text-slate-200">
      <Header />

      <PageHero title="Skills" subtitle="Technical Expertise & Technologies" />

      {/* Skills Section */}
      <section className="mx-auto max-w-6xl px-4 py-12 pb-24 sm:py-16">
        <Skills ref={skillsRef} />
      </section>
    </main>
  );
}
