import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

const projects: Project[] = [
  {
    title: "YYC Food Trucks - Employee & Event Management System",
    description: "Developed a comprehensive full-stack platform for food truck operations management. Implemented features including employee scheduling, event coordination, shift tracking, and real-time availability monitoring. Built with modern web technologies and a focus on scalability and user experience.",
    technologies: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Prisma", "PostgreSQL"],
    githubUrl: "https://github.com/leonamotyer/capstoneGOATS",
    image: "/yycfoodtrucks.png"
  },
  {
    title: "Rollin' in Dough",
    description: "Developed a sweet e-commerce platform for a local baker. Now cookie lovers can order their fix 24/7.",
    technologies: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Square API", "Email.js API"],
    githubUrl: "https://github.com/yoohyunk/rollin-in-dough",//https://github.com/leonamotyer/rollin-in-dough",
    image: "/rollinindough.png"
  },
  {
    title: "No Cap Cafe",
    description: "Developed a comprehensive restaurant management system that handles everything from table assignments to order tracking.",
    technologies: ["C#", "Visual Studio", ".NET", "MySQL Server"],
    githubUrl: "https://github.com/CDanielTurner/OOP2ResturantManager",
    image: "/nocapcafe.png"
  },
  {
    title: "Noize",
    description: "Built a music streaming platform that's basically Spotify's knockoff. Features include playlist creation, dynamic search functions.",
    technologies: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Supabase"],
    githubUrl: "https://github.com/leonamotyer/Noize",
    image: "/noize.png"
  }
];

const Projects: React.FC = () => {
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
                <span
                  key={i}
                  className="px-3 py-1 text-sm bg-amber-500/20 text-amber-300 rounded-full"
                >
                  {tech}
                </span>
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
              {project.liveUrl && (
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