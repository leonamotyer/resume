import React from 'react';
import { motion } from 'framer-motion';
import experienceData from '../data/experience.json';
import Image from 'next/image';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
  image?: string;
}

const Experience: React.FC = () => {
  const experiences = experienceData.experiences as ExperienceItem[];

  return (
    <div className="space-y-12">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative pl-8 border-l-2 border-amber-500"
        >
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-500" />
          <div className="mb-2">
            <h3 className="text-xl font-bold text-amber-500">{exp.title}</h3>
            <p className="text-gray-400">{exp.company}</p>
            <p className="text-sm text-gray-500">{exp.period}</p>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {exp.description.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          {exp.title === "Platform Engineer" && (
            <motion.div
              initial={{ opacity: 0, y: 20, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.6,
                delay: 0.2,
                type: "spring",
                stiffness: 100
              }}
              className="mt-4 relative w-full max-w-lg mx-auto rounded-md overflow-hidden shadow-lg perspective-1000"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/80 to-transparent z-10"
              >
                <p className="text-sm text-amber-500 font-semibold">Log Ingestion Dashboard - Cost Optimization Results</p>
              </motion.div>
              <motion.div
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="relative"
              >
                <Image
                  src="/collectiveLogs.png"
                  alt="Datadog Log Ingestion Dashboard"
                  width={600}
                  height={300}
                  className="w-full h-auto object-cover"
                  priority
                />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Experience; 