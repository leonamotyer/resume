"use client";

import About from "./About";
import Header from "../../components/Header";
import PageHero from "../../components/PageHero";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />

      <PageHero title="About Me" subtitle="Get to Know Leona Motyer" />

      {/* About Section */}
      <section className="pb-12">
        <About />
      </section>
    </main>
  );
}
