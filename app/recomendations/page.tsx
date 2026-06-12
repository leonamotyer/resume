"use client";

import Recommendations from "./Recommendations";
import Header from "../../components/Header";
import PageHero from "../../components/PageHero";

export default function RecommendationsPage() {
  return (
    <main className="min-h-screen text-slate-200">
      <Header />

      <PageHero title="Recommendations" subtitle="Professional Testimonials" />

      {/* Recommendations Section */}
      <section className="pb-12">
        <Recommendations />
      </section>
    </main>
  );
}
