import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import skillsData from '../data/skills.json';
import { FaChevronDown } from 'react-icons/fa';

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

export interface SkillsRef {
  expandSkill: (skillName: string) => void;
}

const Skills = forwardRef<SkillsRef>((_, ref) => {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const skills = skillsData.skills as SkillsData;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If scrolling up and a skill is expanded, close it
      if (currentScrollY < lastScrollY && expandedSkill) {
        setExpandedSkill(null);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, expandedSkill]);

  useEffect(() => {
    if (expandedSkill) {
      setTimeout(() => {
        const skillElement = document.getElementById(`skill-${expandedSkill.toLowerCase().replace(/\s+/g, '-')}`);
        if (skillElement) {
          // Calculate the current position of the element
          const elementRect = skillElement.getBoundingClientRect();
          const elementTop = elementRect.top + window.pageYOffset;
          
          // Find any expanded content that might be above this element
          let expandedContentHeight = 0;
          const allSkillElements = document.querySelectorAll('[id^="skill-"]');
          
          allSkillElements.forEach((el) => {
            const skillName = el.id.replace('skill-', '').replace(/-/g, ' ');
            const skillNameNormalized = skillName.replace(/\s+/g, ' ').trim();
            const expandedSkillNormalized = expandedSkill.toLowerCase().replace(/\s+/g, ' ');
            
            // If this element is above our target and has expanded content
            if (el.getBoundingClientRect().top < elementRect.top && 
                skillNameNormalized !== expandedSkillNormalized) {
              const expandedContent = el.nextElementSibling;
              if (expandedContent && expandedContent.classList.contains('bg-red-600/15')) {
                expandedContentHeight += expandedContent.offsetHeight;
              }
            }
          });
          
          const yOffset = -100;
          const y = elementTop + expandedContentHeight + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [expandedSkill]);

  useImperativeHandle(ref, () => ({
    expandSkill: (skillName: string) => {
      if (expandedSkill === skillName) {
        setExpandedSkill(null);
      } else {
        setExpandedSkill(skillName);
      }
    }
  }));

  const handleSkillClick = (skillName: string) => {
    if (expandedSkill === skillName) {
      setExpandedSkill(null);
    } else {
      setExpandedSkill(skillName);
    }
  };

  return (
    <div id="skills-section" className="space-y-12">
      {Object.entries(skills).map(([category, categorySkills], categoryIndex) => (
        <div key={category} className="space-y-6">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-amber-500"
          >
            {category}
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categorySkills.map((skill, index) => (
              <div key={skill.name}>
                <motion.div
                  id={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative bg-red-600/20 p-6 rounded-lg border border-red-500/30 ${
                    skill.expandable ? 'cursor-pointer hover:bg-red-600/30 group' : ''
                  }`}
                  onClick={() => skill.expandable && handleSkillClick(skill.name)}
                  whileHover={skill.expandable ? { 
                    y: -4,
                    transition: { duration: 0.2 }
                  } : {}}
                >
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-lg font-medium"
                      style={{ color: skill.color }}
                    >
                      {skill.name}
                    </span>
                    {skill.expandable && (
                      <motion.div
                        animate={{ 
                          rotate: expandedSkill === skill.name ? 180 : 0,
                          opacity: expandedSkill === skill.name ? 1 : 0.3
                        }}
                        transition={{ duration: 0.2 }}
                        className="text-amber-500/30 group-hover:text-amber-500/50"
                      >
                        <FaChevronDown className="w-3 h-3" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
                <AnimatePresence>
                  {expandedSkill === skill.name && skill.details && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 bg-red-600/15 rounded-lg p-6 border border-red-500/20"
                    >
                      <h4 className="text-amber-400 font-medium mb-4">{skill.details.title}</h4>
                      <ul className="space-y-2 text-gray-300">
                        {skill.details.items.map((item, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                            {item}
                          </motion.li>
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
});

export default Skills; 