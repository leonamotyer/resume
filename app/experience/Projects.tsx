import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import projectsData from "../../data/projects.json";
import ImageCarousel from "../../components/ImageCarousel";
import { SkillsRef } from "./Skills";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  image?: string;
  images?: string[];
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-slate-900/70 border border-cyan-400/15 rounded-lg overflow-hidden hover:border-cyan-400/40 hover:bg-cyan-950/30 transition-colors duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/10"
        >
          {project.images ? (
            <ImageCarousel
              images={project.images}
              alt={project.title}
            />
          ) : (
            project.image && (
              <img
                src={project.image}
                alt={project.title}
                className={
                  "w-full h-40 sm:h-48 bg-black " +
                  (project.title === "Noize"
                    ? "object-contain p-4"
                    : "object-cover object-center")
                }
              />
            )
          )}
          <div className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-cyan-300 mb-2">
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-300 mb-4 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleTechnologyClick(tech)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-mono bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-400/20 rounded-full hover:bg-cyan-400/20 transition-colors cursor-pointer"
                >
                  {tech}
                </motion.button>
              ))}
            </div>
            <div className="flex gap-3 sm:gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-300 transition-colors p-1"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <FaGithub className="text-lg sm:text-xl" />
                </a>
              )}
              {"liveUrl" in project && project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-300 transition-colors p-1"
                  aria-label={`View ${project.title} live demo`}
                >
                  <FaExternalLinkAlt className="text-lg sm:text-xl" />
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
