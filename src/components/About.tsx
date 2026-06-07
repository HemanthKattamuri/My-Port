import { motion } from "motion/react";
import { Brain, Star, Layers, Cpu } from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: <Brain size={18} className="text-zinc-800 dark:text-zinc-200" />,
      title: "Problem Solving & ML Rigor",
      desc: "Firm foundation in high-dimensional probability models, optimization mathematics, and neural network constraints."
    },
    {
      icon: <Cpu size={18} className="text-zinc-800 dark:text-zinc-200" />,
      title: "Real-time AI Engineering",
      desc: "Skilled in writing custom PyTorch neural loops, building optimized C++ inference backends, and profiling GPU allocations."
    },
    {
      icon: <Layers size={18} className="text-zinc-800 dark:text-zinc-200" />,
      title: "Research-Oriented Mindset",
      desc: "Driven to write clean academic digests, conduct thorough mathematical validations, and participate in peer reviews."
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Title Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase block mb-3">
              [ 01 // OVERVIEW ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              PROFESSIONAL SYNOPSIS
            </h2>
            <div className="h-[2px] w-12 bg-slate-950 dark:bg-white mt-5" />
            <p className="mt-6 text-xs text-zinc-500 font-mono leading-relaxed">
              &ldquo;Theoretical rigor combined with execution performance dictates the success of intelligent agents.&rdquo;
            </p>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-zinc-600 dark:text-zinc-400 font-sans text-sm sm:text-base leading-relaxed tracking-wide font-light"
            >
              <p>
                I am <strong className="font-medium text-slate-800 dark:text-white">Hemanth Kattamuri</strong>, a specialized Artificial Intelligence and Machine Learning Engineering student committed to exploring the cutting edge of deep neural networks. Loving both vector structures and system engineering, I train, optimize, and evaluate statistical learning models with high efficiency.
              </p>
              <p>
                My academic journey is characterized by a strong enthusiasm for linear operators, information theory, and numerical optimization. Rather than treating machine learning as purely abstract modules, I actively dissect complex backpropagation constraints, design high-performance inference graphs, and evaluate models using rigorous validation metrics.
              </p>
              <p>
                My long-term ambition centers on contributing directly to the machine learning research landscape while shaping secure, scalable agentic structures. Whether engineering real-time computer vision networks for low-lux conditions or constructing multi-agent graph search architectures, I aim to combine hardware efficiency with deep algorithmic innovation.
              </p>
            </motion.div>

            {/* Structured highlight cards in bento grid styled glass cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-6 border-t border-black/10 dark:border-white/10">
              {highlights.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-5 rounded-xl bg-zinc-100/30 dark:bg-zinc-950/20 backdrop-blur-md border border-neutral-200/50 dark:border-zinc-800/50 hover:border-black/30 dark:hover:border-white/20 transition-all duration-300"
                >
                  <div className="p-2 w-fit rounded-lg bg-zinc-200/50 dark:bg-zinc-900/50 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-xs font-semibold tracking-wider text-slate-800 dark:text-white uppercase mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
