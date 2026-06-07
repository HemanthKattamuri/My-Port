import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Code, Settings, Terminal, Sparkles, Database } from "lucide-react";

interface SkillItem {
  name: string;
  level: number;
  tags: string[];
  description: string;
}

const skillCategories = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    icon: <Cpu size={16} />,
    description: "Architecting statistical models, neural nets, and probabilistic estimators.",
    skills: [
      { name: "Machine Learning", level: 92, tags: ["Scikit-Learn", "XGBoost", "SVM", "KNN", "Inference"], description: "Supervised and unsupervised learning, hyperparameter optimization, and regression mapping." },
      { name: "Deep Learning", level: 90, tags: ["PyTorch", "TensorFlow", "Keras", "ANN", "CNN", "RNN"], description: "Building custom deep neural networks, backpropagation profiling, and gradient stabilization." },
      { name: "Generative AI", level: 88, tags: ["Gemini API", "HuggingFace", "RAG", "LLMs", "VectorDBs"], description: "Prompt engineering, orchestrating multi-agent graph pipelines, and structured search patterns." },
      { name: "Computer Vision", level: 85, tags: ["OpenCV", "YOLO", "UNet", "SegmentAnything", "TensorRT"], description: "Semantic object segmentation, real-time image classifiers, and bounding box trackers." },
      { name: "Statistical Modelling", level: 90, tags: ["Pandas", "Matplotlib", "Seaborn", "Feature Selection"], description: "Thorough statistical evaluations, feature vector manipulation, and clean exploratory analysis." }
    ]
  },
  {
    id: "programming",
    title: "Programming Languages",
    icon: <Code size={16} />,
    description: "Writing performant, clean-structured algorithms and multi-threaded handlers.",
    skills: [
      { name: "Python", level: 95, tags: ["Core Python", "Object Oriented", "AsyncIO", "Numpy"], description: "Primary ML/DS pipeline language. Skilled in writing custom mathematical matrices and async sockets." },
      { name: "Java", level: 84, tags: ["OOP Protocols", "Exception Handling", "Multithreading"], description: "Robust academic backend backbone. Excellent understanding of garbage collection and structural patterns." },
      { name: "JavaScript", level: 80, tags: ["ES6 Modules", "React DOM", "Node.js Web", "Express"], description: "Client/Server full-stack orchestration. Proficient in handling dynamic JSON rendering and web sockets." },
      { name: "SQL", level: 85, tags: ["PostgreSQL", "Complex Joins", "Indexes", "Normalization"], description: "Relational modeling, transaction handling, and constructing fast multi-table queries." }
    ]
  },
  {
    id: "tools",
    title: "Development Suite & Tools",
    icon: <Settings size={16} />,
    description: "Configuring robust deployment models and local programming sandbox environments.",
    skills: [
      { name: "Git & GitHub", level: 90, tags: ["CI/CD Flows", "Cherry Pick", "PR Reviews", "Semantic Tags"], description: "Structured branch workflows, automated action schedules, and full repository lifecycle control." },
      { name: "AWS", level: 78, tags: ["EC2 Instances", "Simple Storage", "S3", "Virtual Clouds"], description: "Cloud resource orchestration, exposing standard port triggers, and loading container mounts." },
      { name: "VS Code", level: 95, tags: ["Debugging Profiles", "Snippets", "Remote Workspaces"], description: "High efficiency code editing environment customized with local profiling dependencies." },
      { name: "Linux Shell", level: 88, tags: ["Bash Scripting", "SSH Tunneling", "Cron Jobs", "Automation"], description: "Writing portable bash scripts to automate machine learning training jobs and mount safe local network volumes." }
    ]
  }
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("ai-ml");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const selectedCategoryData = skillCategories.find((cat) => cat.id === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase block mb-3">
              [ 03 // TECH STACK ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              CORE SPECIALIZATION
            </h2>
            <div className="h-[2px] w-12 bg-slate-950 dark:bg-white mt-5" />
            <p className="mt-6 text-xs text-zinc-500 font-mono leading-relaxed">
              Evaluating parameters and capabilities across layers on algorithmic robustness, execution optimization, and systemic deployment.
            </p>

            {/* Segment Controls */}
            <div className="flex flex-col gap-2 mt-10">
              {skillCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setSelectedSkill(null);
                  }}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-lg text-left text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-slate-950 text-white dark:bg-white dark:text-black shadow-lg"
                      : "bg-zinc-100/30 hover:bg-zinc-100 dark:bg-zinc-900/10 dark:hover:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {category.icon}
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          {/* Skill Grid Layout */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-4 rounded-lg bg-zinc-100/40 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-900/40">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light font-sans flex items-center gap-1.5">
                <Terminal size={12} />
                {selectedCategoryData?.description} Click on any key element to analyze its engineering highlights.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedCategoryData?.skills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-6 rounded-xl border cursor-pointer select-none transition-all duration-300 ${
                    selectedSkill?.name === skill.name
                      ? "bg-slate-950/5 border-slate-950 dark:bg-white/5 dark:border-white"
                      : "bg-zinc-100/20 border-zinc-200 hover:border-zinc-400 dark:bg-zinc-950/10 dark:border-zinc-900 dark:hover:border-zinc-700"
                  }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-display text-sm font-bold text-slate-800 dark:text-white">
                      {skill.name}
                    </h3>
                    <span className="font-mono text-[10px] text-zinc-400 font-medium">
                      {skill.level}% Proficiency
                    </span>
                  </div>

                  {/* Clean thin gauge bar */}
                  <div className="h-[2px] w-full bg-zinc-300 dark:bg-zinc-800 rounded-full overflow-hidden mb-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-slate-950 dark:bg-white"
                    />
                  </div>

                  {/* Mini Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-full border border-neutral-200 dark:border-zinc-800 bg-neutral-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Extended Detail Card drawer */}
            <AnimatePresence mode="wait">
              {selectedSkill && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-6 rounded-xl bg-zinc-100/50 dark:bg-zinc-950/40 border border-neutral-200 dark:border-zinc-900"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={13} className="text-zinc-500 animate-pulse" />
                    <h4 className="font-display font-bold text-xs uppercase tracking-widest text-slate-900 dark:text-white">
                      {selectedSkill.name} Technical Context
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                    {selectedSkill.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
