import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  color: string;
  category: string;
}

const skills: Skill[] = [
  // Programming Languages
  { name: "Python", color: "#3776AB", category: "Programming Languages" },
  { name: "Terraform", color: "#7B42BC", category: "Programming Languages" },
  { name: "C#", color: "#512BD4", category: "Programming Languages" },
  { name: "Java", color: "#007396", category: "Programming Languages" },
  
  // Web Technologies
  { name: "HTML", color: "#E34F26", category: "Web Technologies" },
  { name: "CSS", color: "#1572B6", category: "Web Technologies" },
  { name: "JavaScript", color: "#F7DF1E", category: "Web Technologies" },
  { name: "TypeScript", color: "#3178C6", category: "Web Technologies" },
  
  // Frameworks & Tools
  { name: "AWS", color: "#232F3E", category: "Frameworks & Tools" },
  { name: "Datadog", color: "#632CA6", category: "Frameworks & Tools" },
  { name: "Next.js", color: "#000000", category: "Frameworks & Tools" },
  { name: "React.js", color: "#61DAFB", category: "Frameworks & Tools" },
  { name: "MAUI Blazor", color: "#512BD4", category: "Frameworks & Tools" },
  { name: "Oracle", color: "#F80000", category: "Frameworks & Tools" },
  { name: "Visual Studio", color: "#5C2D91", category: "Frameworks & Tools" },
  { name: "Jira", color: "#007ACC", category: "Frameworks & Tools" },
  { name: "Confluence", color: "#0078D7", category: "Frameworks & Tools" },
  
  // Database Management
  { name: "SQL", color: "#4479A1", category: "Database Management" },
  
  // Version Control
  { name: "Git", color: "#F05032", category: "Version Control" },
  
  // Operating Systems
  { name: "Linux", color: "#FCC624", category: "Operating Systems" },
  { name: "Windows", color: "#0078D6", category: "Operating Systems" },
  { name: "Mac", color: "#000000", category: "Operating Systems" }
];

const Skills: React.FC = () => {
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