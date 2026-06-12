//Leona Motyer Resume
//Version 2.2026 — "service mesh" edition
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFileDownload,
} from "react-icons/fa";
import Header from "../components/Header";
import TopologyMap from "../components/TopologyMap";

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

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-200">
      <Header />

      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-mesh-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="animate-blob absolute -top-32 -left-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="animate-blob animation-delay-2000 absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="animate-blob animation-delay-4000 absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-cyan-700/10 blur-3xl" />
        {/* drifting scanline */}
        <div className="animate-scan absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan-400/[0.04] to-transparent" />
      </div>

      <section className="relative flex min-h-screen flex-col items-center px-4 pt-24 pb-10 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 w-full max-w-6xl text-center"
        >
          {/* Terminal connect line */}
          <p className="mb-5 font-mono text-xs text-slate-500 sm:text-sm">
            <span className="text-cyan-400">$</span> mesh connect
            leona.motyer.ca{" "}
            <span className="text-emerald-400">
              ··· connection established
            </span>
            <span className="animate-caret ml-1 inline-block h-3.5 w-[7px] translate-y-0.5 bg-cyan-400" />
          </p>

          <h1 className="animate-gradient-x text-glow-cyan mb-3 bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl lg:text-7xl">
            Leona Motyer
          </h1>
          <p className="mb-7 flex items-center justify-center gap-3 font-mono text-base text-slate-400 sm:text-lg">
            <span className="hidden h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/60 sm:block" />
            platform-engineer · software-developer
            <span className="hidden h-px w-10 bg-gradient-to-l from-transparent to-cyan-400/60 sm:block" />
          </p>

          {/* Social links */}
          <div className="mb-10 flex justify-center gap-3 sm:gap-4">
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
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-slate-950/60 text-lg text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20 sm:h-12 sm:w-12 sm:text-xl"
                aria-label={label}
              >
                <Icon />
              </motion.a>
            ))}
          </div>

          {/* The mesh */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25 }}
          >
            <TopologyMap />
          </motion.div>

          {/* Status bar */}
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-cyan-400/10 pt-4 font-mono text-[11px] text-slate-500 sm:text-xs">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              6/6 services healthy
            </span>
            <span>region: yeg-1 (Edmonton)</span>
            <span>uptime: 99.99%</span>
            <span className="hidden text-cyan-500/70 lg:inline">
              hover a node to inspect · click to route
            </span>
            <span className="text-cyan-500/70 lg:hidden">
              tap a service to route
            </span>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
