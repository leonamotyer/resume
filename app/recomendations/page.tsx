"use client";

import Recommendations from "./Recommendations";
import Header from "../../components/Header";
import PageHero from "../../components/PageHero";

export default function RecommendationsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />

      <PageHero title="Recommendations" subtitle="Professional Testimonials" />

      {/* Recommendations Section */}
      <section className="pb-12">
        <Recommendations />
      </section>
    </main>
  );
}
