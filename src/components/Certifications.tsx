import React from "react";
import { motion } from "motion/react";
import { Award, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";

const certificationsList = [
  {
    title: "Fundamentals of Deep Learning",
    issuer: "NVIDIA Deep Learning Institute",
    date: "November 2024",
    credentialId: "NVIDIA-DLI-9824B",
    skillsLearned: ["CNN backpropagation", "Sequence Modeling (LSTM)", "Data Augmentation", "Gradient Descent"]
  },
  {
    title: "AWS Cloud Foundations Academy",
    issuer: "Amazon Web Services (AWS)",
    date: "July 2024",
    credentialId: "AWS-ACF-74291",
    skillsLearned: ["Virtual Clouds (VPC)", "Scale Groups (EC2)", "Identity Access (IAM)", "Object Storage (S3)"]
  },
  {
    title: "Advanced Data Analytics Professional",
    issuer: "Google Career Certificates",
    date: "April 2024",
    credentialId: "GCC-ADA-38294",
    skillsLearned: ["Regression Modeling", "Exploratory Statistics", "Pandas processing", "Hypothesis tests"]
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-neutral-100/5 dark:bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase block mb-3">
              [ 04.5 // CREDENTIALS ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              CERTIFICATIONS
            </h2>
            <div className="h-[2px] w-12 bg-slate-950 dark:bg-white mt-5" />
            <p className="mt-6 text-xs text-zinc-500 font-mono leading-relaxed font-light">
              Verifiable skills assessments from global technology authorities validating theoretical expertise and platform proficiencies.
            </p>
          </div>

          {/* Cards list */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {certificationsList.map((cert, idx) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-7 rounded-xl bg-zinc-100/30 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-900/50 hover:bg-zinc-100/50 dark:hover:bg-zinc-950/35 hover:border-black/25 dark:hover:border-white/10 transition-all duration-300"
              >
                {/* Badge decoration */}
                <div className="flex items-start justify-between">
                  <div className="p-2.5 rounded-lg bg-zinc-200/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-300">
                    <Award size={16} />
                  </div>
                  <span className="text-[9px] font-mono font-medium text-zinc-400 dark:text-zinc-500">
                    ID: {cert.credentialId}
                  </span>
                </div>

                <div className="mt-5 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                    {cert.issuer}
                  </span>
                  <h3 className="font-display text-base font-bold text-slate-800 dark:text-white group-hover:text-black dark:group-hover:text-white">
                    {cert.title}
                  </h3>
                </div>

                <div className="mt-6 space-y-3 pt-5 border-t border-zinc-200/50 dark:border-zinc-910/50">
                  <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                    <ShieldCheck size={11} className="text-zinc-550 shrink-0" /> Covered Competencies
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {cert.skillsLearned.map((skill) => (
                      <span
                        key={skill}
                        className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-full bg-zinc-200/30 dark:bg-zinc-900/30 text-zinc-500 dark:text-zinc-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
