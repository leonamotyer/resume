import React from "react";
import { motion } from "framer-motion";
import aboutData from "../../data/about.json";

const About: React.FC = () => {
  const { about } = aboutData;

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
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-red-900 rounded-lg blur opacity-25"></div>
            <img
              src={about.image}
              alt={about.imageAlt}
              className="relative rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:w-1/2"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-amber-500">
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
              className="px-4 sm:px-6 py-2 bg-amber-500 text-black rounded-lg font-semibold hover:bg-amber-400 transition-colors text-center text-sm sm:text-base"
            >
              {about.links.github.text}
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={about.links.email.url}
              className="px-4 sm:px-6 py-2 border border-amber-500 text-amber-500 rounded-lg font-semibold hover:bg-amber-500/10 transition-colors text-center text-sm sm:text-base"
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
