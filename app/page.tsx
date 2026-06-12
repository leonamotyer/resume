//Leona Motyer Resume
//Version 1.2025
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFileDownload,
  FaBriefcase,
  FaCode,
  FaLayerGroup,
  FaQuoteRight,
  FaUser,
  FaPaperPlane,
  FaArrowRight,
} from "react-icons/fa";
import Header from "../components/Header";
import Link from "next/link";

const socialLinks = [
  {
    href: "https://github.com/leonamotyer",
    icon: FaGithub,
    label: "GitHub Profile",
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/leona-motyer/",
    icon: FaLinkedin,
    label: "LinkedIn Profile",
    external: true,
  },
  {
    href: "mailto:leona@motyer.ca",
    icon: FaEnvelope,
    label: "Send Email",
    external: false,
  },
  {
    href: "/LeonaMotyerResume.pdf",
    icon: FaFileDownload,
    label: "Download Resume",
    external: false,
    download: true,
  },
];

const navCards = [
  {
    href: "/experience",
    icon: FaBriefcase,
    title: "Experience & Education",
    description: "Professional journey & academic background",
  },
  {
    href: "/experience/projects",
    icon: FaCode,
    title: "Projects",
    description: "Portfolio of development work",
  },
  {
    href: "/experience/skills",
    icon: FaLayerGroup,
    title: "Skills",
    description: "Technical expertise & technologies",
  },
  {
    href: "/recomendations",
    icon: FaQuoteRight,
    title: "Recommendations",
    description: "Professional testimonials",
  },
  {
    href: "/about",
    icon: FaUser,
    title: "About",
    description: "Get to know Leona Motyer",
  },
  {
    href: "/contact",
    icon: FaPaperPlane,
    title: "Contact",
    description: "Get in touch & collaborate",
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />

      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]" />
        <div className="animate-blob absolute -top-32 -left-20 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="animate-blob animation-delay-2000 absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-red-900/35 blur-3xl" />
        <div className="animate-blob animation-delay-4000 absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-amber-700/15 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center px-4 pt-28 pb-16 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 w-full max-w-5xl text-center"
        >
          <h1 className="animate-gradient-x mb-4 bg-gradient-to-r from-amber-400 via-amber-500 to-red-800 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl lg:text-7xl">
            Leona Motyer
          </h1>
          <p className="mb-8 flex items-center justify-center gap-3 text-lg text-gray-300 sm:text-xl lg:text-2xl">
            <span className="hidden h-px w-10 bg-gradient-to-r from-transparent to-amber-500/60 sm:block" />
            Platform Engineer &amp; Software Developer
            <span className="hidden h-px w-10 bg-gradient-to-l from-transparent to-amber-500/60 sm:block" />
          </p>

          {/* Social links */}
          <div className="mb-12 flex justify-center gap-3 sm:gap-4">
            {socialLinks.map(({ href, icon: Icon, label, external, download }) => (
              <motion.a
                key={label}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                {...(download ? { download: true } : {})}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:text-amber-400 hover:shadow-lg hover:shadow-amber-500/20 sm:h-14 sm:w-14 sm:text-2xl"
                aria-label={label}
              >
                <Icon />
              </motion.a>
            ))}
          </div>

          {/* Navigation Cards */}
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {navCards.map(({ href, icon: Icon, title, description }, index) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl"
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-amber-500/40 to-red-900/40 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
                <Link
                  href={href}
                  className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-red-950/60 to-gray-900/60 p-5 text-left backdrop-blur-sm transition-colors duration-300 group-hover:border-amber-500/30 sm:p-6"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-lg text-amber-500 ring-1 ring-amber-500/20 transition-colors duration-300 group-hover:bg-amber-500/20">
                      <Icon />
                    </span>
                    <FaArrowRight className="text-sm text-gray-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-500" />
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-amber-500 sm:text-xl">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-300 sm:text-base">
                    {description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
      </section>
    </main>
  );
}
