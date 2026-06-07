import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Research from "./components/Research";
import Analytics from "./components/Analytics";
import FutureVision from "./components/FutureVision";
import Contact from "./components/Contact";
import AIChatBot from "./components/AIChatBot";
import Certifications from "./components/Certifications";
import Leadership from "./components/Leadership";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("portfolio-dark-mode");
    if (saved !== null) return saved === "true";
    return true; // Default to luxury dark mode
  });

  const [activeSection, setActiveSection] = useState("home");

  // Prevent copying & cutting portfolio text
  useEffect(() => {
    const handleClipboardBlock = (e: ClipboardEvent) => {
      // Allow inputs/textareas to function normally, block the rest
      const activeEl = document.activeElement;
      const isInput = activeEl && (
        activeEl.tagName === "INPUT" || 
        activeEl.tagName === "TEXTAREA" || 
        activeEl.getAttribute("contenteditable") === "true"
      );
      if (!isInput) {
        e.preventDefault();
      }
    };

    document.addEventListener("copy", handleClipboardBlock);
    document.addEventListener("cut", handleClipboardBlock);

    return () => {
      document.removeEventListener("copy", handleClipboardBlock);
      document.removeEventListener("cut", handleClipboardBlock);
    };
  }, []);

  // Toggle .dark class in document root
  useEffect(() => {
    localStorage.setItem("portfolio-dark-mode", String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Observer to track which section is currently active under viewport scrolling
  useEffect(() => {
    const sections = [
      "home",
      "about",
      "education",
      "skills",
      "projects",
      "certifications",
      "leadership",
      "research",
      "analytics",
      "vision",
      "contact"
    ];

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "-40% 0px -50% 0px" // Trigger as element crosses center horizontal lane
    });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? "bg-[#030303] text-zinc-100" : "bg-[#fafafa] text-zinc-800"
    }`}>
      {/* Dynamic Header */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} activeSection={activeSection} />

      <main className="relative">
        {/* Core Layout modules */}
        <Hero darkMode={darkMode} />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Certifications />
        <Leadership />
        <Research />
        <Analytics />
        <FutureVision />
        <Contact />
      </main>

      {/* Floating recruiter chat clone */}
      <AIChatBot />

      {/* Footer */}
      <footer className={`py-12 border-t text-center ${
        darkMode ? "bg-black/50 border-white/5 text-zinc-500" : "bg-white border-black/5 text-zinc-400"
      }`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-4">
          <p className="font-display text-xs font-semibold tracking-widest uppercase text-slate-800 dark:text-zinc-300">
            HEMANTH KATTAMURI &bull; AI/ML ENGINEERING PORTFOLIO
          </p>
          <p className="font-mono text-[9px] tracking-widest uppercase">
            &copy; 2026. Designed for absolute technical precision.
          </p>
          <div className="flex justify-center gap-4 text-xs font-mono">
            <a
              href="https://github.com/HemanthKattamuri"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition"
            >
              [GITHUB]
            </a>
            <span>/</span>
            <a
              href="https://linkedin.com/in/hemanth-kattamuri-a8b417240"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition"
            >
              [LINKEDIN]
            </a>
            <span>/</span>
            <a
              href="mailto:khemanth6302@gmail.com"
              className="hover:text-slate-900 dark:hover:text-white transition"
            >
              [EMAIL]
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
