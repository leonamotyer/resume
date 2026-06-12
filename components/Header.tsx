"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience & Education" },
  { href: "/experience/projects", label: "Projects" },
  { href: "/experience/skills", label: "Skills" },
  { href: "/recomendations", label: "Recommendations" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest(".mobile-menu")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-slate-950/80 backdrop-blur-xl shadow-lg shadow-black/40 border-b border-cyan-400/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
            <Link
              href="/"
              className="group flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="relative flex h-8 w-8 items-center justify-center font-mono font-bold text-xs text-cyan-200">
                <svg
                  viewBox="0 0 32 32"
                  className="absolute inset-0 h-full w-full drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]"
                  aria-hidden="true"
                >
                  <path
                    d="M16 2 L28.12 9 L28.12 23 L16 30 L3.88 23 L3.88 9 Z"
                    fill="rgba(8,47,73,0.7)"
                    stroke="rgba(34,211,238,0.8)"
                    strokeWidth="1.5"
                  />
                </svg>
                <span className="relative">LM</span>
              </span>
              <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 group-hover:from-cyan-200 group-hover:to-violet-300 transition-all duration-300 whitespace-nowrap">
                Leona Motyer
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] px-2 py-1 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-cyan-300"
                      : "text-slate-300 hover:text-cyan-300"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-cyan-400/10 ring-1 ring-cyan-400/30"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden mobile-menu">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/15 bg-white/5 text-slate-300 hover:text-cyan-300 transition-colors duration-300"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <FaTimes className="h-5 w-5" />
              ) : (
                <FaBars className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden mobile-menu overflow-hidden"
            >
              <div className="mb-4 mt-2 space-y-1 rounded-2xl border border-cyan-400/15 bg-slate-950/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200 ${
                          isActive
                            ? "bg-cyan-400/10 text-cyan-300 ring-1 ring-inset ring-cyan-400/30"
                            : "text-slate-300 hover:bg-white/5 hover:text-cyan-300"
                        }`}
                      >
                        {item.label}
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
