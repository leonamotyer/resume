"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import aboutData from "../../data/about.json";

const About: React.FC = () => {
  const { about } = aboutData;
  const [isFlipped, setIsFlipped] = useState(false);
  const [frontIndex, setFrontIndex] = useState(0);

  useEffect(() => {
    setFrontIndex(Math.floor(Math.random() * about.images.length));
  }, [about.images.length]);

  const backIndex = 1 - frontIndex;

  return (
    <section className="py-16 sm:py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center gap-8 sm:gap-12"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/2"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-lg blur opacity-25"></div>
            <button
              type="button"
              onClick={() => setIsFlipped((flipped) => !flipped)}
              className="relative block w-full rounded-lg shadow-2xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Flip photo between motorcycle and snowboarding"
              title="Click to flip"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                className="relative w-full"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{
                  duration: 0.6,
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                }}
              >
                <div style={{ backfaceVisibility: "hidden" }}>
                  <img
                    src={about.images[frontIndex].src}
                    alt={about.images[frontIndex].alt}
                    className="w-full rounded-lg"
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <img
                    src={about.images[backIndex].src}
                    alt={about.images[backIndex].alt}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              </motion.div>
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:w-1/2"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-cyan-300">
            {about.title}
          </h2>
          {about.description.map((paragraph, index) => (
            <p key={index} className="text-base sm:text-lg text-gray-300 mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={about.links.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2 bg-cyan-400 text-slate-950 rounded-lg font-semibold hover:bg-cyan-300 transition-colors text-center text-sm sm:text-base"
            >
              {about.links.github.text}
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={about.links.email.url}
              className="px-4 sm:px-6 py-2 border border-cyan-400 text-cyan-300 rounded-lg font-semibold hover:bg-cyan-400/10 transition-colors text-center text-sm sm:text-base"
            >
              {about.links.email.text}
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
