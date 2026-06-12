"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle: string;
}

const PageHero = ({ title, subtitle }: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="animate-blob absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="animate-blob animation-delay-2000 absolute -top-10 right-1/4 h-72 w-72 rounded-full bg-red-900/30 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-4xl px-4 text-center"
      >
        <h1 className="animate-gradient-x mb-4 bg-gradient-to-r from-amber-400 via-amber-500 to-red-800 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="text-lg text-gray-300 sm:text-xl lg:text-2xl">
          {subtitle}
        </p>
        <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-amber-500 to-red-800" />
      </motion.div>
    </section>
  );
};

export default PageHero;
