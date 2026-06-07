import { motion } from "motion/react";
import { Sparkles, BrainCircuit, Globe, Rocket } from "lucide-react";

export default function FutureVision() {
  const vectors = [
    {
      icon: <BrainCircuit size={18} className="text-zinc-600 dark:text-zinc-300" />,
      title: "Self-Verifying Inference",
      desc: "Developing self-correcting prompt circuits that monitor knowledge graphs to eradicate vector agent hallucinations."
    },
    {
      icon: <Globe size={18} className="text-zinc-600 dark:text-zinc-300" />,
      title: "Global Collaboration Labs",
      desc: "Transitioning to world-class graduate schools to publish at top leagues (NeurIPS, CVPR, ICML) alongside top researchers."
    },
    {
      icon: <Rocket size={18} className="text-zinc-600 dark:text-zinc-300" />,
      title: "Hardware Aligned Shifting",
      desc: "Harnessing TensorRT, CUDA configurations, and INT8/FP16 quantization architectures to run heavy networks on lightweight edges."
    }
  ];

  return (
    <section id="vision" className="py-24 relative overflow-hidden bg-neutral-100/10 dark:bg-zinc-950/15">
      {/* Background Aurora */}
      <div className="absolute top-[50%] right-[2%] w-[25vw] h-[25vw] rounded-full bg-slate-500 dark:bg-zinc-900 aurora-glow pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase block mb-3">
              [ 07 // MANIFESTO ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              FUTURE VISION & AMBITIONS
            </h2>
            <div className="h-[2px] w-12 bg-slate-950 dark:bg-white mt-5" />
            <p className="mt-6 text-xs text-zinc-500 font-mono leading-relaxed font-light">
              Defining roadmap vectors toward advanced academic masteries, system optimizations, and high-quality open-source benchmarks.
            </p>
          </div>

          {/* Core Essay statement area */}
          <div className="lg:col-span-8 space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-10 rounded-2xl bg-zinc-100/30 dark:bg-zinc-950/20 backdrop-blur-md border border-neutral-200 dark:border-zinc-900 shadow-xl relative overflow-hidden"
            >
              {/* Corner Sparkle */}
              <Sparkles size={16} className="absolute top-6 right-6 text-zinc-400 animate-pulse" />

              <h3 className="font-display text-[11px] font-bold tracking-widest text-slate-900 dark:text-zinc-300 uppercase mb-4">
                LONG-TERM RESEARCH DIALECT
              </h3>
              
              <blockquote className="font-sans text-sm sm:text-lg font-light text-zinc-600 dark:text-zinc-300 leading-relaxed italic border-l-[1.5px] border-slate-950 dark:border-white pl-5 space-y-4">
                <p>
                  &ldquo;We stand on the threshold of a paradigm shift where deep neural modules transcend simple mathematical approximation. The challenge of our decade is building unified agentic systems that can reason, verify their own predictions against persistent boundaries, and make safe, real-time choices with minimal microchip footprint.&rdquo;
                </p>
                <cite className="block text-xs font-mono font-medium not-italic text-zinc-500 uppercase tracking-widest mt-3">
                  &mdash; HEMANTH KATTAMURI, 2026
                </cite>
              </blockquote>
            </motion.div>

            {/* Strategic Vectors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {vectors.map((vector, idx) => (
                <motion.div
                  key={vector.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-5 rounded-xl bg-zinc-100/10 dark:bg-zinc-950/10 border border-neutral-200/50 dark:border-zinc-900/40"
                >
                  <div className="p-2 w-fit rounded-lg bg-zinc-200/55 dark:bg-zinc-900/50 mb-4 text-zinc-600 dark:text-zinc-300">
                    {vector.icon}
                  </div>
                  <h4 className="font-display text-xs font-semibold text-slate-800 dark:text-white uppercase tracking-wider mb-2">
                    {vector.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                    {vector.desc}
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
