"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageHeroProps {
  title: string;
  subtitle: string;
}

const SERVICE_NAMES: Record<string, string> = {
  "/about": "svc/about",
  "/experience": "svc/experience",
  "/experience/projects": "svc/projects",
  "/experience/skills": "svc/skills",
  "/recomendations": "svc/recommendations",
  "/contact": "svc/contact",
};

// Deterministic per-service latency so server and client render the same
const fakeLatency = (s: string) =>
  (s.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 28) + 5;

const PageHero = ({ title, subtitle }: PageHeroProps) => {
  const pathname = usePathname();
  const service =
    SERVICE_NAMES[pathname] ?? `svc/${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const latency = fakeLatency(service);

  return (
    <section className="relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-16">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-mesh-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="animate-blob absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="animate-blob animation-delay-2000 absolute -top-10 right-1/4 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-4xl px-4 text-center"
      >
        {/* Mesh breadcrumb */}
        <p className="mb-4 flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-slate-500 sm:text-sm">
          <span className="text-slate-600">gw/leona</span>
          <span className="text-cyan-500">→</span>
          <span className="text-cyan-300">{service}</span>
          <span className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-300 sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            HEALTHY
          </span>
        </p>

        <h1 className="animate-gradient-x mb-4 bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="text-lg text-slate-300 sm:text-xl">{subtitle}</p>

        {/* Node telemetry strip */}
        <div className="mx-auto mt-6 flex max-w-md flex-wrap items-center justify-center gap-x-5 gap-y-1 border-t border-cyan-400/15 pt-3 font-mono text-[11px] text-slate-500">
          <span>status: 200 OK</span>
          <span>p99: {latency}ms</span>
          <span>replicas: 1/1</span>
        </div>
      </motion.div>
    </section>
  );
};

export default PageHero;
