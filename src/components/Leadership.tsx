import React from "react";
import { motion } from "motion/react";
import { ShieldAlert, BookOpen, Trophy, Compass, Users } from "lucide-react";

const leadershipRoles = [
  {
    role: "Lead Coordinator & Mentor",
    organization: "Developer ML Interest Circle",
    period: "2023 - Present",
    desc: "Spearheaded on-campus deep learning review panels, helping compile machine learning modules, and managing practical model development exercises for 80+ active participants.",
    icon: <Users size={16} />
  },
  {
    role: "Winner (First Place Podium)",
    organization: "AeroAI Smart Campus Hackathon",
    period: "October 2024",
    desc: "Coordinated a team of 4 to train and optimize a lightweight computer vision tracking segmenter running on Jetson devices to actively control campus lighting matrices, saving 22% secondary energy costs.",
    icon: <Trophy size={16} />
  },
  {
    role: "Open Source Contributor & Reviewer",
    organization: "TensorFlow & PyTorch Varsity Forums",
    period: "2022 - Present",
    desc: "Elegantly documenting computational model pipelines, addressing GitHub developer alerts, and maintaining highly polished, readable statistical scripts for novice academic teams.",
    icon: <Compass size={16} />
  }
];

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 relative overflow-hidden bg-neutral-100/10 dark:bg-zinc-950/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase block mb-3">
              [ 04.8 // ADVOCACY ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              LEADERSHIP & ENGAGEMENT
            </h2>
            <div className="h-[2px] w-12 bg-slate-950 dark:bg-white mt-5" />
            <p className="mt-6 text-xs text-zinc-500 font-mono leading-relaxed font-light">
              Pioneering deep learning academic communities, coordinating collaborative hackathon projects, and reviewing local statistical repositories.
            </p>
          </div>

          {/* Cards listing */}
          <div className="lg:col-span-8 space-y-6">
            {leadershipRoles.map((role, idx) => (
              <motion.div
                key={role.organization}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-7 rounded-xl bg-zinc-100/20 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-900/40 hover:bg-zinc-100/40 dark:hover:bg-zinc-950/30 hover:border-black/25 dark:hover:border-white/10 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 w-fit rounded-lg bg-zinc-200/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-300 shrink-0">
                      {role.icon}
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold text-slate-800 dark:text-white">
                        {role.role}
                      </h3>
                      <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">
                        {role.organization}
                      </p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400 uppercase border border-neutral-200 dark:border-zinc-800 px-2 py-0.5 rounded w-fit self-start sm:self-center">
                    {role.period}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-light font-sans leading-relaxed">
                  {role.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
