import { motion } from "motion/react";
import { Brain, Eye, Sparkles, Database, Network } from "lucide-react";

const interests = [
  {
    title: "Generative AI",
    icon: <Sparkles size={20} className="text-zinc-600 dark:text-zinc-300" />,
    description: "Deep study of probabilistic models capable of mapping multidimensional distributions. Exploring Conditional Diffusion Process, Transformer architectures, and context vector attention maps.",
    keyConcepts: ["DDPM Markov chains", "Self-Attention Mathematics", "Prompt context embedding", "Latent distribution mapping"]
  },
  {
    title: "Deep Learning Theories",
    icon: <Brain size={20} className="text-zinc-600 dark:text-zinc-300" />,
    description: "Analytic dissection of deep computational layers. Formulating solutions to gradient vanishing/exploding problems, optimizing neural optimizer pathways, and stabilizing deep networks.",
    keyConcepts: ["AdamW/SGD Weight decay", "Stochastic matrix boundaries", "Layer Normalization mechanics", "Residual connections"]
  },
  {
    title: "Computer Vision",
    icon: <Eye size={20} className="text-zinc-600 dark:text-zinc-300" />,
    description: "Architecting real-time models to extract structure from dynamic light waves. Researching high-speed pixel segmenters, boundary isolating kernels, and model operations on edge computing matrices.",
    keyConcepts: ["Semantic Segmentation loss", "TensorRT quantization", "Coordinate bounding ratios", "Spatial pooling filters"]
  },
  {
    title: "Agentic AI Architectures",
    icon: <Network size={20} className="text-zinc-600 dark:text-zinc-300" />,
    description: "Engineering frameworks where multiple autonomous agents cooperate. Modeling state-checking loops, vector database alignment grids, and auto-corrective output validations.",
    keyConcepts: ["Multi-agent prompt states", "Graph RAG link models", "Structured agent debates", "Feedback execution validation"]
  },
  {
    title: "Computational Mathematics & Optimization",
    icon: <Database size={20} className="text-zinc-600 dark:text-zinc-300" />,
    description: "Extracting structural signals from complex mathematical systems. Modeling high-dimensional covariance tensors, formulating optimization spaces, and analyzing dynamic learning operators.",
    keyConcepts: ["Bayesian inference layers", "Covariance tensor mapping", "Optimization algorithms", "Analytical mathematics"]
  }
];

export default function Research() {
  return (
    <section id="research" className="py-24 relative overflow-hidden bg-neutral-100/10 dark:bg-zinc-950/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase block mb-3">
              [ 05 // RESEARCH ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              RESEARCH DOMAINS & INTERESTS
            </h2>
            <div className="h-[2px] w-12 bg-slate-950 dark:bg-white mt-5" />
            <p className="mt-6 text-xs text-zinc-500 font-mono leading-relaxed">
              Evaluating computational models, mathematical optimization spaces, and system behaviors under real-world performance footprints.
            </p>
          </div>

          {/* Research cards timeline */}
          <div className="lg:col-span-8 space-y-6">
            {interests.map((interest, idx) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-8 rounded-xl bg-zinc-100/30 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-900/50 hover:bg-zinc-100/50 dark:hover:bg-zinc-950/35 hover:border-black/25 dark:hover:border-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-4.5 mb-4">
                  <div className="p-2.5 rounded-lg bg-zinc-200/50 dark:bg-zinc-900/50">
                    {interest.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-800 dark:text-white">
                    {interest.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light font-sans mb-5">
                  {interest.description}
                </p>

                {/* Sub-mathematical terms row */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-200/50 dark:border-zinc-900/50">
                  {interest.keyConcepts.map((concept) => (
                    <span
                      key={concept}
                      className="text-[9px] font-mono font-medium px-2.5 py-1 rounded bg-zinc-200/30 dark:bg-zinc-900/30 text-zinc-500 dark:text-zinc-400 border border-neutral-300/20 dark:border-zinc-800/20 uppercase"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
