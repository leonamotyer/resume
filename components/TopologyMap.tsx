"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaBriefcase,
  FaCode,
  FaLayerGroup,
  FaQuoteRight,
  FaUser,
  FaPaperPlane,
  FaArrowRight,
} from "react-icons/fa";
import type { IconType } from "react-icons";

interface ServiceNode {
  id: string;
  href: string;
  name: string;
  title: string;
  desc: string;
  icon: IconType;
  x: number;
  y: number;
  baseLatency: number;
}

const GATEWAY = { x: 500, y: 330 };

const NODES: ServiceNode[] = [
  {
    id: "experience",
    href: "/experience",
    name: "svc/experience",
    title: "Experience & Education",
    desc: "Career deployment history and academic provisioning records.",
    icon: FaBriefcase,
    x: 223,
    y: 172,
    baseLatency: 12,
  },
  {
    id: "projects",
    href: "/experience/projects",
    name: "svc/projects",
    title: "Projects",
    desc: "Shipped builds, client work and side deployments.",
    icon: FaCode,
    x: 777,
    y: 172,
    baseLatency: 23,
  },
  {
    id: "skills",
    href: "/experience/skills",
    name: "svc/skills",
    title: "Skills",
    desc: "Languages, cloud tooling and the platform stack.",
    icon: FaLayerGroup,
    x: 179,
    y: 405,
    baseLatency: 8,
  },
  {
    id: "recommendations",
    href: "/recomendations",
    name: "svc/recommendations",
    title: "Recommendations",
    desc: "Verified attestations from colleagues and instructors.",
    icon: FaQuoteRight,
    x: 821,
    y: 405,
    baseLatency: 31,
  },
  {
    id: "about",
    href: "/about",
    name: "svc/about",
    title: "About",
    desc: "The human operating behind the platform.",
    icon: FaUser,
    x: 350,
    y: 559,
    baseLatency: 17,
  },
  {
    id: "contact",
    href: "/contact",
    name: "svc/contact",
    title: "Contact",
    desc: "Public ingress for new opportunities and collaboration.",
    icon: FaPaperPlane,
    x: 650,
    y: 559,
    baseLatency: 26,
  },
];

// Faint service-to-service links that make the graph read as a mesh
const CROSS_EDGES: Array<[string, string]> = [
  ["experience", "skills"],
  ["projects", "recommendations"],
  ["skills", "about"],
];

const hexPath = (cx: number, cy: number, r: number) => {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90);
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  });
  return `M${pts.join("L")}Z`;
};

// Curved edge from gateway to a node, bowed perpendicular to the line
const edgePath = (x: number, y: number, bow: number) => {
  const mx = (GATEWAY.x + x) / 2;
  const my = (GATEWAY.y + y) / 2;
  const dx = x - GATEWAY.x;
  const dy = y - GATEWAY.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * bow;
  const cy = my + (dx / len) * bow;
  return `M${GATEWAY.x},${GATEWAY.y} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x},${y}`;
};

const TopologyMap = () => {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  const [gwHovered, setGwHovered] = useState(false);
  const [latencies, setLatencies] = useState<Record<string, number>>(() =>
    Object.fromEntries(NODES.map((n) => [n.id, n.baseLatency])),
  );

  useEffect(() => {
    const tick = setInterval(() => {
      setLatencies(
        Object.fromEntries(
          NODES.map((n) => [
            n.id,
            Math.max(2, n.baseLatency + Math.round((Math.random() - 0.5) * 8)),
          ]),
        ),
      );
    }, 2200);
    return () => clearInterval(tick);
  }, []);

  const nodeById = useMemo(
    () => Object.fromEntries(NODES.map((n) => [n.id, n])),
    [],
  );

  const hoveredNode = hovered ? nodeById[hovered] : null;

  const open = (href: string) => router.push(href);

  return (
    <div className="relative w-full">
      {/* ============ Desktop: SVG mesh ============ */}
      <div className="relative hidden lg:block">
        <svg
          viewBox="0 0 1000 700"
          className="h-auto w-full select-none"
          role="navigation"
          aria-label="Site map rendered as a service mesh"
        >
          <defs>
            <filter id="node-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="gw-core" cx="50%" cy="42%" r="65%">
              <stop offset="0%" stopColor="rgba(34,211,238,0.35)" />
              <stop offset="100%" stopColor="rgba(2,6,23,0.95)" />
            </radialGradient>
          </defs>

          {/* --- Edges gateway -> services --- */}
          {NODES.map((n, i) => {
            const active = hovered === n.id;
            const bow = i % 2 === 0 ? 42 : -42;
            return (
              <g key={`edge-${n.id}`}>
                <path
                  id={`edge-${n.id}`}
                  d={edgePath(n.x, n.y, bow)}
                  fill="none"
                  stroke={
                    active ? "rgba(34,211,238,0.7)" : "rgba(34,211,238,0.16)"
                  }
                  strokeWidth={active ? 1.8 : 1.1}
                  filter={active ? "url(#node-glow)" : undefined}
                  className="transition-all duration-300"
                />
                {/* outbound packet (cyan) */}
                <circle r="3" fill="#22d3ee" filter="url(#node-glow)">
                  <animateMotion
                    dur={`${2.6 + i * 0.45}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.5}s`}
                  >
                    <mpath href={`#edge-${n.id}`} />
                  </animateMotion>
                </circle>
                {/* inbound packet (violet, reversed) */}
                <circle r="2.4" fill="#a78bfa" opacity="0.9">
                  <animateMotion
                    dur={`${3.4 + i * 0.35}s`}
                    repeatCount="indefinite"
                    begin={`${0.9 + i * 0.4}s`}
                    keyPoints="1;0"
                    keyTimes="0;1"
                    calcMode="linear"
                  >
                    <mpath href={`#edge-${n.id}`} />
                  </animateMotion>
                </circle>
              </g>
            );
          })}

          {/* --- Faint cross-links between services --- */}
          {CROSS_EDGES.map(([a, b]) => {
            const na = nodeById[a];
            const nb = nodeById[b];
            const lit = hovered === a || hovered === b;
            return (
              <line
                key={`x-${a}-${b}`}
                x1={na.x}
                y1={na.y}
                x2={nb.x}
                y2={nb.y}
                stroke={
                  lit ? "rgba(167,139,250,0.45)" : "rgba(167,139,250,0.12)"
                }
                strokeWidth="1"
                strokeDasharray="3 7"
                className="transition-all duration-300"
              />
            );
          })}

          {/* --- Gateway node (links to GitHub) --- */}
          <a
            href="https://github.com/leonamotyer"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Leona's GitHub profile"
            className="cursor-pointer outline-none"
            onMouseEnter={() => setGwHovered(true)}
            onMouseLeave={() => setGwHovered(false)}
            onFocus={() => setGwHovered(true)}
            onBlur={() => setGwHovered(false)}
          >
            <circle
              cx={GATEWAY.x}
              cy={GATEWAY.y}
              r="62"
              fill="none"
              stroke="rgba(34,211,238,0.35)"
              strokeWidth="1"
              className="animate-sonar"
            />
            <circle
              cx={GATEWAY.x}
              cy={GATEWAY.y}
              r="78"
              fill="none"
              stroke={
                gwHovered ? "rgba(34,211,238,0.45)" : "rgba(34,211,238,0.18)"
              }
              strokeWidth="1"
              strokeDasharray="4 10"
              className="transition-all duration-300"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${GATEWAY.x} ${GATEWAY.y}`}
                to={`360 ${GATEWAY.x} ${GATEWAY.y}`}
                dur="40s"
                repeatCount="indefinite"
              />
            </circle>
            <path
              d={hexPath(GATEWAY.x, GATEWAY.y, 58)}
              fill="url(#gw-core)"
              stroke={
                gwHovered ? "rgba(34,211,238,1)" : "rgba(34,211,238,0.6)"
              }
              strokeWidth={gwHovered ? 2 : 1.5}
              filter="url(#node-glow)"
              className="transition-all duration-300"
            />
            <text
              x={GATEWAY.x}
              y={GATEWAY.y - 4}
              textAnchor="middle"
              className="font-mono"
              fill="#e2e8f0"
              fontSize="22"
              fontWeight="700"
            >
              LM
            </text>
            <text
              x={GATEWAY.x}
              y={GATEWAY.y + 20}
              textAnchor="middle"
              className="font-mono"
              fill="rgba(34,211,238,0.9)"
              fontSize="11"
            >
              gw/leona
            </text>
            <text
              x={GATEWAY.x}
              y={GATEWAY.y + 92}
              textAnchor="middle"
              className="font-mono"
              fill={
                gwHovered
                  ? "rgba(103,232,249,0.95)"
                  : "rgba(148,163,184,0.8)"
              }
              fontSize="11"
            >
              {gwHovered
                ? "→ github.com/leonamotyer"
                : "api-gateway · yeg-1 · v2026.6"}
            </text>
          </a>

          {/* --- Service nodes --- */}
          {NODES.map((n) => {
            const active = hovered === n.id;
            const Icon = n.icon;
            return (
              <g
                key={n.id}
                tabIndex={0}
                role="link"
                aria-label={`Open ${n.title}`}
                className="cursor-pointer outline-none"
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(n.id)}
                onBlur={() => setHovered(null)}
                onClick={() => open(n.href)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") open(n.href);
                }}
              >
                {active && (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r="48"
                    fill="none"
                    stroke="rgba(34,211,238,0.4)"
                    strokeWidth="1"
                    className="animate-sonar"
                  />
                )}
                <path
                  d={hexPath(n.x, n.y, 44)}
                  fill={active ? "rgba(8,47,73,0.85)" : "rgba(2,6,23,0.85)"}
                  stroke={
                    active ? "rgba(34,211,238,0.9)" : "rgba(34,211,238,0.3)"
                  }
                  strokeWidth={active ? 1.8 : 1.2}
                  filter={active ? "url(#node-glow)" : undefined}
                  className="transition-all duration-300"
                />
                <Icon
                  x={n.x - 11}
                  y={n.y - 16}
                  size={22}
                  fill={active ? "#67e8f9" : "#7dd3fc"}
                />
                {/* health dot */}
                <circle
                  cx={n.x + 26}
                  cy={n.y - 30}
                  r="4"
                  fill="#34d399"
                  filter="url(#node-glow)"
                />
                <text
                  x={n.x}
                  y={n.y + 18}
                  textAnchor="middle"
                  className="font-mono"
                  fill={active ? "#a5f3fc" : "#cbd5e1"}
                  fontSize="11.5"
                >
                  {n.name}
                </text>
                <text
                  x={n.x}
                  y={n.y + 62}
                  textAnchor="middle"
                  className="font-mono"
                  fill="rgba(148,163,184,0.75)"
                  fontSize="10.5"
                >
                  200 OK · {latencies[n.id]}ms
                </text>
              </g>
            );
          })}
        </svg>

        {/* --- Hover inspector card --- */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              key={hoveredNode.id}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-none absolute z-20 w-64 rounded-xl border border-cyan-400/30 bg-slate-950/95 p-4 shadow-2xl shadow-cyan-500/10 backdrop-blur-md"
              style={{
                // Center via negative margin (not transform — framer-motion
                // overwrites the transform property while animating) and
                // clamp so the 16rem-wide card stays inside the map frame.
                marginLeft: "-8rem",
                left: `clamp(8.5rem, ${(hoveredNode.x / 1000) * 100}%, calc(100% - 8.5rem))`,
                top: `${((hoveredNode.y + (hoveredNode.y < 250 ? 80 : -185)) / 700) * 100}%`,
              }}
            >
              <div className="mb-2 flex items-center justify-between font-mono text-xs">
                <span className="text-cyan-300">{hoveredNode.name}</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  HEALTHY
                </span>
              </div>
              <p className="mb-3 text-sm leading-snug text-slate-300">
                {hoveredNode.desc}
              </p>
              <div className="flex items-center justify-between font-mono text-[11px] text-slate-500">
                <span>p99 {latencies[hoveredNode.id]}ms</span>
                <span className="flex items-center gap-1 text-cyan-400">
                  open node <FaArrowRight className="text-[9px]" />
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ============ Mobile/tablet: service registry list ============ */}
      <div className="mx-auto max-w-md space-y-2 lg:hidden">
        <div className="mb-3 font-mono text-xs text-slate-500">
          $ mesh ls --registry gw/leona
        </div>
        <a
          href="https://github.com/leonamotyer"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-xl border border-cyan-400/30 bg-cyan-950/30 p-3.5 transition-colors duration-200 hover:border-cyan-400/60"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/15 font-mono text-sm font-bold text-cyan-200 ring-1 ring-cyan-400/40">
            LM
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 font-mono text-sm text-cyan-200">
              gw/leona
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="block truncate text-xs text-slate-400">
              api-gateway · github.com/leonamotyer
            </span>
          </span>
          <FaArrowRight className="shrink-0 text-xs text-slate-600 transition-all group-hover:translate-x-0.5 group-hover:text-cyan-400" />
        </a>
        {NODES.map((n, i) => {
          const Icon = n.icon;
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
            >
              <Link
                href={n.href}
                className="group flex items-center gap-3 rounded-xl border border-cyan-400/15 bg-slate-950/70 p-3.5 transition-colors duration-200 hover:border-cyan-400/50 hover:bg-cyan-950/30"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/25">
                  <Icon />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 font-mono text-sm text-cyan-200">
                    {n.name}
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="block truncate text-xs text-slate-400">
                    {n.title}
                  </span>
                </span>
                <span className="font-mono text-[10px] text-slate-500">
                  {latencies[n.id]}ms
                </span>
                <FaArrowRight className="shrink-0 text-xs text-slate-600 transition-all group-hover:translate-x-0.5 group-hover:text-cyan-400" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TopologyMap;
