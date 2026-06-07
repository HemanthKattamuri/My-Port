import { motion } from "motion/react";
import { GraduationCap, Award, BookOpen, Calendar } from "lucide-react";

const educationHistory = [
  {
    degree: "B.Tech in Artificial Intelligence & Machine Learning",
    institution: "Parul University (Gujarat, India)",
    period: "2022 - 2026",
    gpa: "8.5 / 10.0 CGPA",
    coursework: [
      "Deep Learning Pipelines",
      "Multivariable Calculus & Linear Algebra",
      "Computer Vision & Pattern Recognition",
      "Data Structures & Optimization Algorithms",
      "Probability, Statistics & Stochastic Processes"
    ],
    achievements: [
      "Top 5% of class in engineering mathematics and computational statistics.",
      "Voted Lead Organizer of College ML developer groups, mentoring 80+ juniors.",
      "Recipient of merit scholarship for excellence in academic projects and research initiatives."
    ]
  },
  {
    degree: "Senior Secondary Education (Class XII - STEM)",
    institution: "SR College, Vijayawada",
    period: "2020 - 2022",
    gpa: "75 %",
    coursework: [
      "Advanced Classical Physics",
      "Integral & Differential Calculus",
      "Computational Computer Science",
      "Analytical Geometry & Coordinate Systems"
    ],
    achievements: [
      "Scored perfect scores in advanced mathematical exams.",
      "Secured National level high rank in competitive engineering entry tests.",
      "Represented school in inter-state science exhibitions."
    ]
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-neutral-100/10 dark:bg-zinc-950/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase block mb-3">
              [ 02 // ACADEMICS ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              EDUCATIONAL PATHWAY
            </h2>
            <div className="h-[2px] w-12 bg-slate-950 dark:bg-white mt-5" />
            <p className="mt-6 text-xs text-zinc-500 font-mono leading-relaxed">
              Dissecting high-dimensional models on a bedrock of strong mathematical training and theoretical engineering rules.
            </p>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-8 relative">
            {/* Center line decoration */}
            <div className="absolute left-[15px] sm:left-[24px] top-4 bottom-4 w-[1px] bg-zinc-300 dark:bg-zinc-800" />

            <div className="space-y-12">
              {educationHistory.map((edu, idx) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative pl-[45px] sm:pl-[70px] group"
                >
                  {/* Timeline Badge Node */}
                  <div className="absolute left-0 sm:left-[8px] top-1.5 w-8 h-8 sm:w-8 sm:h-8 rounded-full bg-zinc-200 dark:bg-zinc-900 border border-zinc-300/65 dark:border-zinc-800 flex items-center justify-center transition-colors group-hover:border-black dark:group-hover:border-white z-10">
                    <GraduationCap size={14} className="text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white" />
                  </div>

                  <div className="p-7 rounded-xl bg-zinc-100/30 dark:bg-zinc-950/35 backdrop-blur-md border border-neutral-200/50 dark:border-zinc-900/50 hover:bg-zinc-100/50 dark:hover:bg-zinc-950/60 hover:border-black/20 dark:hover:border-white/10 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        {/* Period and Score */}
                        <div className="flex items-center gap-3 text-zinc-500 font-mono text-[10px] tracking-wider uppercase">
                          <span className="flex items-center gap-1">
                            <Calendar size={10} />
                            {edu.period}
                          </span>
                          <span>&bull;</span>
                          <span className="text-zinc-800 dark:text-zinc-200 font-semibold">{edu.gpa}</span>
                        </div>
                        {/* Degree Title */}
                        <h3 className="font-display text-base sm:text-lg font-bold text-slate-800 dark:text-white mt-1 group-hover:text-black dark:group-hover:text-white">
                          {edu.degree}
                        </h3>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-200/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 w-fit self-start sm:self-center">
                        {edu.institution}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 pt-6 border-t border-zinc-200/50 dark:border-zinc-900/50">
                      {/* Coursework list */}
                      <div className="md:col-span-5 space-y-4">
                        <h4 className="font-display font-semibold text-[10px] tracking-wider uppercase text-zinc-800 dark:text-zinc-300 flex items-center gap-1.5 matches">
                          <BookOpen size={11} /> Advanced Coursework
                        </h4>
                        <ul className="space-y-1.5">
                          {edu.coursework.map((course) => (
                            <li key={course} className="text-xs text-zinc-500 dark:text-zinc-400 font-light flex items-center gap-1.5 leading-relaxed">
                              <span className="h-1 w-1 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                              {course}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Achievements */}
                      <div className="md:col-span-7 space-y-4">
                        <h4 className="font-display font-semibold text-[10px] tracking-wider uppercase text-zinc-800 dark:text-zinc-300 flex items-center gap-1.5 matches">
                          <Award size={11} /> Academic Excellence
                        </h4>
                        <ul className="space-y-2">
                          {edu.achievements.map((item, id) => (
                            <li key={id} className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed flex items-start gap-2">
                              <span className="mt-1.5 h-[3px] w-[3px] min-w-[3px] rounded-full bg-zinc-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
