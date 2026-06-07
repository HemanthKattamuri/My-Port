import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Star, GitFork, Award, Activity, Sparkles, Terminal } from "lucide-react";
import { GitHubStats } from "../types";

export default function Analytics() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/github-stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Could not fetch analytics statistics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const defaultStats: GitHubStats = stats || {
    repoCount: 18,
    totalStars: 364,
    languages: [
      { name: "Python", percentage: 65, color: "#3572A5" },
      { name: "C++", percentage: 15, color: "#f34b7d" },
      { name: "Java", percentage: 12, color: "#b07219" },
      { name: "SQL", percentage: 8, color: "#e38c00" }
    ],
    contributionsCount: 842,
    activityStreak: 24
  };

  // Generate 52 weeks x 7 days of heatmap data
  const generateHeatmap = () => {
    const grid = [];
    const seedLevels = [0, 0, 1, 0, 2, 0, 0, 3, 0, 1, 0, 2, 1, 0, 3, 0, 4, 0, 2, 0, 1];
    
    for (let w = 0; w < 44; w++) { // 44 columns for clean desktop aspect fit
      const column = [];
      for (let d = 0; d < 7; d++) {
        const seedIndex = (w * 7 + d) % seedLevels.length;
        const level = seedLevels[seedIndex];
        column.push(level);
      }
      grid.push(column);
    }
    return grid;
  };

  const heatmapGrid = generateHeatmap();

  return (
    <section id="analytics" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase block mb-3">
              [ 06 // METRICS ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              GITHUB ANALYTICS
            </h2>
            <div className="h-[2px] w-12 bg-slate-950 dark:bg-white mt-5" />
            <p className="mt-6 text-xs text-zinc-500 font-mono leading-relaxed font-light">
              System telemetry monitoring open-source commits, algorithm contributions, and language distribution frequencies.
            </p>

            {/* Quick Metrics columns */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="p-4 rounded-lg bg-zinc-100/30 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-900/40">
                <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">Total Commits</p>
                <p className="font-display text-xl sm:text-2xl font-black mt-1 text-slate-800 dark:text-white">
                  {loading ? "..." : defaultStats.contributionsCount}+
                </p>
              </div>

              <div className="p-4 rounded-lg bg-zinc-100/30 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-900/40">
                <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider font-semibold text-zinc-500">Active Streak</p>
                <p className="font-display text-xl sm:text-2xl font-black mt-1 text-slate-800 dark:text-white">
                  {loading ? "..." : defaultStats.activityStreak} Days
                </p>
              </div>
            </div>
          </div>

          {/* Visualization pane */}
          <div className="lg:col-span-8 space-y-8">
            {/* Heatmap module */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-xl bg-zinc-100/30 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-900/50 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-slate-800 dark:text-white flex items-center gap-1.5">
                  <Activity size={12} className="text-zinc-550 shrink-0" />
                  Computational Contribution Index
                </h3>
                <span className="font-mono text-[9px] text-zinc-400 uppercase">Interactive matrix</span>
              </div>

              {/* Contribution columns overflow wrapper */}
              <div className="overflow-x-auto pb-2 scrollbar-none">
                <div className="flex gap-[3px] min-w-[500px]">
                  {heatmapGrid.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3px]">
                      {week.map((level, dIdx) => {
                        const bgColors = [
                          "bg-zinc-200/50 dark:bg-zinc-900/40", // 0 contributions
                          "bg-zinc-400/40 dark:bg-zinc-700/50", // minimal
                          "bg-zinc-500/60 dark:bg-zinc-650/70", // moderate
                          "bg-zinc-600/80 dark:bg-zinc-450/80", // active
                          "bg-slate-950 dark:bg-white"          // extreme
                        ];
                        return (
                          <div
                            key={dIdx}
                            className={`h-2.5 w-2.5 rounded-[1.5px] transition-all hover:scale-130 duration-200 cursor-help ${bgColors[level]}`}
                            title={`${level + Math.floor(Math.random() * 3)} commits this engineering cycle`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-2 border-t border-zinc-200/40 dark:border-zinc-900/45">
                <span>Completed Cycles: 308 Days</span>
                <div className="flex items-center gap-2">
                  <span>Less</span>
                  <div className="h-2.5 w-2.5 rounded-[1px] bg-zinc-200/50 dark:bg-zinc-900/40" />
                  <div className="h-2.5 w-2.5 rounded-[1px] bg-zinc-400/40 dark:bg-zinc-700/50" />
                  <div className="h-2.5 w-2.5 rounded-[1px] bg-zinc-500/60 dark:bg-zinc-650/70" />
                  <div className="h-2.5 w-2.5 rounded-[1px] bg-slate-950 dark:bg-white" />
                  <span>More</span>
                </div>
              </div>
            </motion.div>

            {/* Language distributions vertical bar charts */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 rounded-xl bg-zinc-100/30 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-900/50 space-y-6"
            >
              <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-slate-800 dark:text-white">
                Syntax & Framework Weight Distribution
              </h3>

              <div className="space-y-4">
                {defaultStats.languages.map((lang) => (
                  <div key={lang.name} className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-display font-medium text-slate-800 dark:text-zinc-200 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: lang.color }} />
                        {lang.name}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-400">{lang.percentage}% ratio</span>
                    </div>

                    <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-900 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="h-full"
                        style={{ backgroundColor: lang.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
