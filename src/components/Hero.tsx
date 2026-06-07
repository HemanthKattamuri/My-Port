import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, ArrowUpRight, Volume2, Square, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { SplineScene } from "./ui/splite";
import { Spotlight } from "./ui/spotlight";

interface HeroProps {
  darkMode: boolean;
}

export default function Hero({ darkMode }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 650;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor(canvas.width / 22), 65); // Responsive nodes count
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.8,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          alpha: Math.random() * 0.45 + 0.05
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = darkMode ? 255 : 0; // matching canvas nodes color to dark mode toggled status
      
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${color}, ${color}, ${p.alpha})`;
        ctx.fill();

        // Connect nodes
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.14 * (darkMode ? 0.7 : 0.35);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${color}, ${color}, ${color}, ${lineAlpha})`;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  // Clean up any ongoing speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeechToggle = () => {
    if (!window.speechSynthesis) {
      alert("Text-to-speech is not fully supported in this browser environment.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const speechText = "Hello! I am Hemanth Kattamuri, an Artificial Intelligence and Machine Learning specialist. I am pursuing my Bachelor of Technology at Parul University, maintaining an eight point five CGPA, with senior secondary foundations at SR College Vijayawada, scoring seventy-five percent. As detailed in my professional synopsis, I specialize in training, optimizing, and evaluating deep neural networks with high efficiency. Loving both vector structures and system engineering, I train, optimize, and evaluate statistical learning models with high performance. Rather than treating machine learning as purely abstract modules, I actively dissect complex backpropagation constraints, design high-performance inference graphs, and evaluate models using rigorous validation metrics. To FAANG, MAANG, and premier tech companies looking for elite technical versatility: I bring a powerful synergy of mathematical optimization with PyTorch, low-level optimization in C plus plus, and multi-agent computer vision pipelines. I am fully ready to join your engineering teams, automate decision pipelines, and design secure, scalable, and hardware-efficient systems. Let's merge forces and build the future of AI together.";

    const utterance = new SpeechSynthesisUtterance(speechText);
    
    const voices = window.speechSynthesis.getVoices();
    const optimalVoice = voices.find(v => v.lang.includes("en-US") && v.name.includes("Google")) || 
                         voices.find(v => v.lang.includes("en-US")) || 
                         voices[0];
    if (optimalVoice) {
      utterance.voice = optimalVoice;
    }
    
    utterance.rate = 1.05;
    utterance.pitch = 1.00;

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    speechRef.current = utterance;
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10 opacity-70"
      />

      {/* Subtle Aurora Center glow */}
      <div className="absolute top-[35%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] rounded-full bg-slate-500/10 dark:bg-zinc-800/20 blur-[130px] pointer-events-none z-0" />

      {/* Grid Mesh Background */}
      <div className={`absolute inset-0 z-0 ${darkMode ? "grid-mesh" : "grid-mesh-light"}`} />

      {/* Hero Content Wrapper */}
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 z-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 min-h-[calc(100vh-6rem)]">
        
        {/* Left Side: Name and Details */}
        <div className="flex-1 w-full text-center lg:text-left flex flex-col items-center lg:items-start order-2 lg:order-1 pt-4 lg:pt-0">
          
          {/* State Pill Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 border border-neutral-300 dark:border-zinc-800/80 rounded-full bg-neutral-200/20 dark:bg-zinc-950/40 backdrop-blur-md mb-6 sm:mb-8 select-none"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-sans text-[11px] font-medium tracking-tight text-neutral-600 dark:text-zinc-400">
              Open to research opportunities & graduate admissions
            </span>
          </motion.div>

          {/* Big Giant Name stacked in two lines with custom tight leading */}
          <motion.h1
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-black text-[12vw] sm:text-[9vw] lg:text-[5.5vw] xl:text-[6.8vw] leading-[0.80] tracking-tighter select-none flex flex-col items-center lg:items-start drop-shadow-[0_10px_35px_rgba(14,165,233,0.06)] dark:drop-shadow-[0_10px_45px_rgba(56,189,248,0.25)]"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-950 via-slate-900 to-slate-800 dark:from-white dark:via-sky-100 dark:to-sky-300 uppercase tracking-tighter">Hemanth</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 via-zinc-700 to-slate-600 dark:from-zinc-300 dark:via-sky-400 dark:to-teal-400 uppercase tracking-tighter">Kattamuri</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-sm sm:text-base md:text-lg font-bold tracking-tight text-amber-500 dark:text-amber-400 mt-2"
          >
            AI & Machine Learning Engineer
          </motion.p>

          {/* Focus description paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="max-w-xl lg:max-w-lg mt-4 font-sans text-xs sm:text-sm md:text-base font-light text-zinc-600 dark:text-zinc-400 leading-relaxed text-center lg:text-left"
          >
            Building intelligent systems at the intersection of Generative AI, Deep Learning, and Computer Vision — with a focus on research, real-world impact, and continuous learning.
          </motion.p>

          {/* Speech Audio introduction trigger block */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 w-full max-w-lg bg-slate-500/5 dark:bg-zinc-950/30 border border-neutral-300/40 dark:border-zinc-800/40 rounded-2xl p-4 backdrop-blur-md"
          >
            {/* Core Speech Controls and Detail layout */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleSpeechToggle}
                className={`flex items-center justify-center w-11 h-11 rounded-xl shrink-0 transition-all duration-300 shadow-md ${
                  isPlaying 
                    ? "bg-amber-500 text-slate-950 hover:bg-amber-400 animate-pulse" 
                    : "bg-sky-500 hover:bg-sky-400 text-white dark:bg-sky-400 dark:hover:bg-sky-300 dark:text-slate-950"
                }`}
                title={isPlaying ? "Stop Voice Presentation" : "Play Voice Presentation"}
              >
                {isPlaying ? <Square size={15} fill="currentColor" /> : <Volume2 size={21} />}
              </button>
              
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 font-bold font-sans text-[11px] tracking-wider text-sky-600 dark:text-sky-400 uppercase">
                  <Sparkles size={11} className="text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                  EXECUTIVE PITCH & SYNOPSIS
                </div>
                <p className="font-sans text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2 leading-normal italic">
                  "{isPlaying ? "Playing Hemanth's professional AI/ML system synthesis, optimized for elite FAANG and MAANG development teams." : "Click to listen to my professional synopsis and company value alignment."}"
                </p>
              </div>

              {/* Dancing audio waves dynamically appearing when playing */}
              {isPlaying && (
                <div className="flex items-end gap-1 h-5 px-2 select-none shrink-0">
                  <span className="w-0.5 h-3 bg-amber-500 animate-[bounce_0.6s_infinite] rounded-full" />
                  <span className="w-0.5 h-5 bg-amber-400 animate-[bounce_0.8s_infinite_0.1s] rounded-full" />
                  <span className="w-0.5 h-2.5 bg-amber-500 animate-[bounce_0.5s_infinite_0.2s] rounded-full" />
                  <span className="w-0.5 h-4.5 bg-amber-400 animate-[bounce_0.7s_infinite_0.15s] rounded-full" />
                </div>
              )}
            </div>
          </motion.div>

          {/* Actions Row to match exact style including diagonal arrow icon */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-8 flex flex-wrap gap-4.5 justify-center lg:justify-start items-center z-30 font-sans"
          >
            {/* GitHub action button - SOLID WHITE in Dark, Solid DARK / border in Light */}
            <a
              href="https://github.com/HemanthKattamuri"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 text-white dark:bg-white dark:text-black font-semibold text-xs transition duration-300 hover:opacity-90 shadow-md border border-slate-950 dark:border-white"
            >
              <Github size={14} />
              GitHub
            </a>

            {/* LinkedIn action button - border / dark glass */}
            <a
              href="https://linkedin.com/in/hemanth-kattamuri-a8b417240"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-300 dark:border-zinc-800 bg-neutral-200/10 dark:bg-zinc-950/20 backdrop-blur-md text-slate-800 dark:text-white font-semibold text-xs transition duration-300 hover:bg-neutral-200/30 dark:hover:bg-zinc-900/40"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>

            {/* Minimal Get in touch diagonal text link */}
            <a
              href="#contact"
              className="flex items-center gap-1 px-3 py-2 text-zinc-650 dark:text-zinc-400 font-semibold text-xs transition hover:text-slate-900 dark:hover:text-white"
            >
              Get in touch <ArrowUpRight size={13} />
            </a>
          </motion.div>
        </div>

        {/* Right Side: Interactive 3D Spline Scene wrapped with Spotlight and glass-glazed card */}
        <div className="flex-1 w-full lg:w-1/2 h-[380px] sm:h-[480px] lg:h-[550px] xl:h-[580px] relative order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-full rounded-2xl sm:rounded-3xl border border-neutral-300/40 dark:border-zinc-800/50 bg-neutral-100/5 dark:bg-zinc-950/20 shadow-[0_24px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.35)] backdrop-blur-md overflow-hidden relative"
          >
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full bg-transparent"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}


