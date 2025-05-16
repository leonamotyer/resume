import React from 'react';
import { motion } from 'framer-motion';
import skillsData from '../data/skills.json';

interface Skill {
  name: string;
  color: string;
  category: string;
}

const Skills: React.FC = () => {
  const skills = skillsData.skills as Skill[];
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <div className="space-y-8">
      {categories.map((category, categoryIndex) => (
        <div key={category} className="space-y-4">
          <h3 className="text-xl font-bold text-amber-500">{category}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills
              .filter(skill => skill.category === category)
              .map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (categoryIndex * 0.2) + (index * 0.1) }}
                  className="bg-red-900/50 p-4 rounded-lg hover:bg-red-900/70 transition-colors duration-300"
                >
                  <div className="flex items-center justify-center">
                    <span 
                      className="text-lg font-semibold"
                      style={{ color: skill.color }}
                    >
                      {skill.name}
                    </span>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills; 