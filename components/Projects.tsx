import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import projectsData from '../data/projects.json';
import { SkillsRef } from './Skills';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  image: string;
  liveUrl?: string;
}

interface ProjectsProps {
  skillsRef: React.RefObject<SkillsRef>;
}

const Projects: React.FC<ProjectsProps> = ({ skillsRef }) => {
  const projects = projectsData.projects as Project[];

  const handleTechnologyClick = (tech: string) => {
    if (skillsRef.current) {
      skillsRef.current.expandSkill(tech);
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-red-900/50 rounded-lg overflow-hidden hover:bg-red-900/70 transition-colors duration-300"
        >
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className={
                "w-full h-48 bg-black " +
                (project.title === "Noize"
                  ? "object-contain p-4"
                  : "object-cover object-center")
              }
            />
          )}
          <div className="p-6">
            <h3 className="text-xl font-bold text-amber-500 mb-2">{project.title}</h3>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleTechnologyClick(tech)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 text-sm bg-amber-500/20 text-amber-300 rounded-full hover:bg-amber-500/30 transition-colors cursor-pointer"
                >
                  {tech}
                </motion.button>
              ))}
            </div>
            <div className="flex gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <FaGithub className="text-xl" />
                </a>
              )}
              {'liveUrl' in project && project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <FaExternalLinkAlt className="text-xl" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Projects; 