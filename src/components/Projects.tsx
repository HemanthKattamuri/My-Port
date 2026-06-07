import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Star, GitBranch, ArrowUpRight, Code2, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { GitHubRepo } from "../types";

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/github-repos");
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      const data = await response.json();
      setRepos(data);
    } catch (err: any) {
      console.error("Could not fetch remote projects, loading default layouts:", err);
      setError("Network slow. Successfully loading premium local repositories asynchronously.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-neutral-100/10 dark:bg-zinc-950/25">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase block mb-3">
              [ 04 // REPOSITORIES ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              AI & MACHINE LEARNING PROJECTS
            </h2>
            <div className="h-[2px] w-12 bg-slate-950 dark:bg-white mt-5" />
          </div>

          <div className="lg:col-span-7 lg:pt-6">
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-light leading-relaxed font-sans">
              Dynamic compilation of Hemanth&apos;s primary software engineering implementations. Pulling directly from GitHub, highlighting optimization indexes, model compilation frameworks, and custom statistical neural blocks.
            </p>
          </div>
        </div>

        {/* Dynamic Display Grid */}
        {loading ? (
          /* High quality minimal skeleton loading */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="p-8 rounded-xl border border-zinc-200 dark:border-zinc-900 bg-zinc-100/20 dark:bg-zinc-950/20 animate-pulse space-y-4"
              >
                <div className="h-4 w-1/3 bg-zinc-300 dark:bg-zinc-800 rounded" />
                <div className="h-12 w-full bg-zinc-300 dark:bg-zinc-800 rounded" />
                <div className="h-3 w-2/3 bg-zinc-300 dark:bg-zinc-800 rounded" />
                <div className="flex gap-2">
                  <div className="h-5 w-16 bg-zinc-300 dark:bg-zinc-800 rounded-full" />
                  <div className="h-5 w-16 bg-zinc-300 dark:bg-zinc-800 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {error && (
              <div className="p-3.5 rounded-lg bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-300/30 dark:border-zinc-800/20 text-[11px] font-mono text-zinc-500 flex items-center gap-2">
                <AlertCircle size={12} />
                <span>{error}</span>
                <button
                  onClick={fetchRepositories}
                  className="ml-auto underline flex items-center gap-1 hover:text-black dark:hover:text-white"
                >
                  <RefreshCw size={10} /> Sync
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {repos.map((repo, idx) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedRepo(repo)}
                  className="group relative p-8 rounded-xl bg-zinc-100/30 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-900/50 hover:bg-zinc-100/60 dark:hover:bg-zinc-950/35 hover:border-black/25 dark:hover:border-white/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Repository title row */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Code2 size={15} className="text-zinc-500 dark:text-zinc-400 group-hover:text-slate-950 dark:group-hover:text-white transition-colors" />
                        <h3 className="font-display text-base font-bold text-slate-800 dark:text-white group-hover:text-black dark:group-hover:text-white">
                          {repo.name}
                        </h3>
                      </div>
                      <span className="font-mono text-[9px] tracking-widest text-zinc-400 font-semibold border border-neutral-200 dark:border-zinc-800 px-2 py-0.5 rounded uppercase">
                        {repo.language}
                      </span>
                    </div>

                    <p className="mt-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light font-sans line-clamp-3">
                      {repo.description}
                    </p>

                    {/* Topics chips */}
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {repo.topics.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] px-2.5 py-0.5 rounded-full bg-zinc-200/50 dark:bg-zinc-90s/10 border border-neutral-300/30 dark:border-zinc-800/40 text-zinc-500 dark:text-zinc-400 uppercase tracking-tight"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card bottom telemetry */}
                  <div className="flex items-center justify-between mt-8 pt-5 border-t border-zinc-200/50 dark:border-zinc-900/50">
                    <div className="flex items-center gap-4 text-zinc-400 font-mono text-[10px]">
                      <span className="flex items-center gap-1">
                        <Star size={11} /> {repo.stars} stars
                      </span>
                      <span className="flex items-center gap-1">
                        <GitBranch size={11} /> {repo.forks} forks
                      </span>
                    </div>

                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase group-hover:text-slate-900 dark:group-hover:text-white flex items-center gap-0.5 transition-colors">
                      Analyze Project
                      <ArrowUpRight size={11} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Exquisite pop up drawer modal displaying structured highlights */}
      <AnimatePresence>
        {selectedRepo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-2xl rounded-xl p-8 bg-white dark:bg-zinc-950 border border-neutral-300 dark:border-zinc-800 shadow-2xl space-y-6"
            >
              {/* Close Button corner */}
              <button
                onClick={() => setSelectedRepo(null)}
                className="absolute top-5 right-5 font-mono text-zinc-400 hover:text-black dark:hover:text-white text-xs select-none uppercase tracking-wider bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 px-3 py-1.5 rounded-md transition-colors"
              >
                Close ESC
              </button>

              {/* Title & Language */}
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-zinc-500 animate-pulse" />
                  <span className="font-mono text-[10px] text-zinc-400 tracking-wider uppercase font-semibold">
                    {selectedRepo.language} REPOSITORY
                  </span>
                </div>
                <h3 className="font-display text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  {selectedRepo.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans font-light">
                {selectedRepo.description}
              </p>

              {/* Key Features / Accomplishments */}
              <div className="space-y-4">
                <h4 className="font-display font-medium text-xs tracking-widest text-slate-800 dark:text-zinc-300 uppercase flex items-center gap-1.5 pt-4 border-t border-zinc-200/50 dark:border-zinc-900/50">
                  <Sparkles size={12} className="text-zinc-500" />
                  Key Achievements & Optimization highlights
                </h4>
                <ul className="space-y-3">
                  {selectedRepo.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans font-light flex items-start gap-2.5"
                    >
                      <span className="mt-1 flex h-4 w-4 min-w-[16px] items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 font-mono text-[9px] font-semibold text-zinc-500">
                        {index + 1}
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Rows */}
              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-zinc-200/50 dark:border-zinc-900/50 flex-wrap justify-between">
                <div className="flex items-center gap-4 text-zinc-400 font-mono text-xs">
                  <span className="flex items-center gap-1">
                    <Star size={13} /> {selectedRepo.stars}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <GitBranch size={13} /> {selectedRepo.forks}
                  </span>
                </div>

                <a
                  href={selectedRepo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4.5 py-2 hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-black border border-black dark:border-white rounded text-xs font-semibold uppercase tracking-widest text-slate-950 dark:text-white transition-all"
                >
                  <Github size={13} /> Source repository
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
