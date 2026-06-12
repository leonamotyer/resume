"use client";

import About from "./About";
import Header from "../../components/Header";
import PageHero from "../../components/PageHero";

export default function AboutPage() {
  return (
    <main className="min-h-screen text-slate-200">
      <Header />

      <PageHero title="About Me" subtitle="Get to Know Leona Motyer" />

      {/* About Section */}
      <section className="pb-12">
        <About />
      </section>
    </main>
  );
}
