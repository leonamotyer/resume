import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import skillsData from '../data/skills.json';

interface Skill {
  name: string;
  color: string;
  expandable?: boolean;
  details?: {
    title: string;
    items: string[];
  };
}

interface SkillsData {
  [category: string]: Skill[];
}

const Skills: React.FC = () => {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const skills = skillsData.skills as SkillsData;

  const handleSkillClick = (skillName: string) => {
    setExpandedSkill(expandedSkill === skillName ? null : skillName);
  };

  return (
    <div className="space-y-8">
      {Object.entries(skills).map(([category, categorySkills], categoryIndex) => (
        <div key={category} className="space-y-4">
          <h3 className="text-xl font-bold text-amber-500">{category}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categorySkills.map((skill, index) => (
              <div key={skill.name}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (categoryIndex * 0.2) + (index * 0.1) }}
                  className={`bg-red-900/50 p-4 rounded-lg transition-colors duration-300 ${
                    skill.expandable ? 'cursor-pointer hover:bg-red-900/70' : ''
                  }`}
                  onClick={() => skill.expandable && handleSkillClick(skill.name)}
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
                <AnimatePresence>
                  {expandedSkill === skill.name && skill.details && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 bg-red-900/30 rounded-lg p-4"
                    >
                      <h4 className="text-amber-400 font-semibold mb-2">{skill.details.title}</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-300">
                        {skill.details.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills; 