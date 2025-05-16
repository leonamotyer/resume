import React from 'react';
import { motion } from 'framer-motion';
import experienceData from '../data/experience.json';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
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
        </motion.div>
      ))}
    </div>
  );
};

export default Experience; 