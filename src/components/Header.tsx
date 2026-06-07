import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeSection: string;
}

interface NavLink {
  name: string;
  href: string;
  highlight?: boolean;
  external?: boolean;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills", highlight: true },
  { name: "Projects", href: "#projects", highlight: true },
  { name: "Certifications", href: "#certifications", highlight: true },
  { name: "Contact", href: "#contact" }
];

export default function Header({ darkMode, setDarkMode, activeSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header
      id="main-header"
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl z-50 transition-all duration-300"
    >
      <div 
        className={`w-full rounded-full border px-6 py-2.5 flex items-center justify-between transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15)] ${
          darkMode 
            ? "bg-black/60 backdrop-blur-xl border-zinc-900/60" 
            : "bg-white/60 backdrop-blur-xl border-neutral-200/60"
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#home"
          id="logo"
          className="flex items-center gap-2.5 font-display text-sm font-bold tracking-tight text-slate-900 dark:text-white transition-opacity hover:opacity-95"
        >
          <div className="h-7 w-7 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-display font-black text-[11px] flex items-center justify-center shrink-0">
            HK
          </div>
          <span className="font-sans font-extrabold tracking-tight text-xs sm:text-sm text-slate-900 dark:text-white">
            Hemanth Kattamuri
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`px-3 py-1.5 font-sans text-xs font-semibold tracking-tight rounded-full transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    activeSection === link.href.substring(1) && !link.external
                      ? darkMode 
                        ? "text-white bg-zinc-900/40" 
                        : "text-slate-900 bg-neutral-200/40"
                      : "text-zinc-650 hover:text-slate-950 dark:text-zinc-400 dark:hover:text-white"
                  } ${
                    link.highlight
                      ? "border border-sky-500/40 dark:border-sky-400/30 text-sky-600 dark:text-sky-400 font-bold bg-sky-500/5 dark:bg-sky-400/5 hover:border-sky-500/60 dark:hover:border-sky-400/50 hover:bg-sky-500/10 dark:hover:bg-sky-400/10 shadow-[0_0_12px_rgba(14,165,233,0.1)]"
                      : ""
                  }`}
                >
                  {link.name}
                  {link.highlight && (
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-500"></span>
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button inside border container */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-full border border-neutral-300 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-neutral-200/40 dark:hover:bg-zinc-900/40 transition-colors cursor-pointer"
            aria-label="Toggle dark mode theme"
          >
            {darkMode ? <Sun size={14} className="text-white" /> : <Moon size={14} className="text-black" />}
          </button>

          {/* Hamburger Menu trigger (Laptops and Smaller Screens) */}
          <button
            onClick={toggleMobileMenu}
            className="xl:hidden p-1.5 rounded-full border border-neutral-300 dark:border-zinc-800 text-slate-950 dark:text-white hover:opacity-85 transition-opacity cursor-pointer"
            aria-label="Toggle layout navigation links menu"
          >
            {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`mt-2 w-full rounded-2xl border p-4 shadow-xl z-50 ${
              darkMode ? "bg-black/95 backdrop-blur-xl border-zinc-900" : "bg-white/95 backdrop-blur-xl border-neutral-200"
            }`}
          >
            <div className="flex flex-col gap-2">
              <ul className="flex flex-col gap-1.5">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3 py-2 rounded-lg font-sans text-xs font-semibold tracking-tight flex items-center justify-between ${
                        activeSection === link.href.substring(1) && !link.external
                          ? "text-slate-900 dark:text-white bg-neutral-200/50 dark:bg-zinc-900/50"
                          : "text-zinc-600 hover:bg-neutral-150 dark:text-zinc-400 dark:hover:bg-zinc-950/50"
                      } ${
                        link.highlight
                          ? "border border-sky-500/20 dark:border-sky-400/15 bg-sky-500/5 dark:bg-sky-400/5 text-sky-600 dark:text-sky-400"
                          : ""
                      }`}
                    >
                      <span>{link.name}</span>
                      {link.highlight && (
                        <span className="relative flex h-1.5 w-1.5 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-500"></span>
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
