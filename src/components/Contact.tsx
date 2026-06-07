import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Mail, Linkedin, Github, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; text: string }>({
    type: null,
    text: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", text: "Please complete all required fields (Name, Email, Message)." });
      return;
    }

    try {
      setLoading(true);
      setStatus({ type: null, text: "" });

      // Clean dispatch transmission to contact endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Problem dispatching your message.");
      }

      setStatus({ 
        type: "success", 
        text: `Success! Message dispatched securely. Opening your device's default mail application to finalize the transmission to khemanth6302@gmail.com...` 
      });

      // Construct and trigger mail client with pre-filled details
      const emailSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
      const emailBody = encodeURIComponent(
        `Hello Hemanth,\n\nI just filled out the contact form on your portfolio.\n\nFrom: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}\n\n--\nSent via Hemanth Kattamuri Portfolio AI Desk`
      );
      
      const mailtoUrl = `mailto:khemanth6302@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      
      // Open device mail client gracefully
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 800);

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus({ type: "error", text: err.message || "Endpoint error. Please try again or email directly." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Header & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase block mb-3">
                [ 08 // CONNECT ]
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                CONTACT DESK
              </h2>
              <div className="h-[2px] w-12 bg-slate-950 dark:bg-white mt-5" />
              <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed font-sans">
                Are you a FAANG recruiter seeking machine learning talents, a research professor outlining graduate scholarship openings, or simply looking to collaborate on deep models? File a message below or trigger and utilize direct links.
              </p>
            </div>

            {/* Structured Direct handles */}
            <div className="space-y-4 pt-6 border-t border-zinc-200/50 dark:border-zinc-900/40">
              <a
                href="mailto:khemanth6302@gmail.com"
                className="flex items-center gap-3 p-4 rounded-xl bg-zinc-100/30 hover:bg-zinc-100 dark:bg-zinc-950/20 dark:hover:bg-zinc-950/40 border border-neutral-200/50 dark:border-zinc-900/50 hover:border-black/20 dark:hover:border-white/10 transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-zinc-200/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-300">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-wider text-zinc-400 uppercase">DIRECT DISPATCH</p>
                  <p className="text-xs sm:text-sm font-display font-semibold text-slate-800 dark:text-white">khemanth6302@gmail.com</p>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/hemanth-kattamuri-a8b417240"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-zinc-100/30 hover:bg-zinc-100 dark:bg-zinc-950/20 dark:hover:bg-zinc-950/40 border border-neutral-200/50 dark:border-zinc-900/50 hover:border-black/20 dark:hover:border-white/10 transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-zinc-200/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-300">
                  <Linkedin size={16} />
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-wider text-zinc-400 uppercase">PROFESSIONAL GRAPH</p>
                  <p className="text-xs sm:text-sm font-display font-semibold text-slate-800 dark:text-white">linkedin.com/in/hemanth-kattamuri</p>
                </div>
              </a>

              <a
                href="https://github.com/HemanthKattamuri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-zinc-100/30 hover:bg-zinc-100 dark:bg-zinc-950/20 dark:hover:bg-zinc-950/40 border border-neutral-200/50 dark:border-zinc-900/50 hover:border-black/20 dark:hover:border-white/10 transition-all duration-300"
              >
                <div className="p-2 rounded-lg bg-zinc-200/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-300">
                  <Github size={16} />
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-wider text-zinc-400 uppercase">REPOSITORY CENTRAL</p>
                  <p className="text-xs sm:text-sm font-display font-semibold text-slate-800 dark:text-white">github.com/HemanthKattamuri</p>
                </div>
              </a>
            </div>
          </div>

          {/* Form module */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-2xl bg-zinc-100/30 dark:bg-zinc-950/20 border border-neutral-200/50 dark:border-zinc-900/50 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-display text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-zinc-350">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-zinc-900 bg-white dark:bg-black text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-[1px] focus:ring-slate-950 dark:focus:ring-white transition"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="font-display text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-zinc-350">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-zinc-900 bg-white dark:bg-black text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-[1px] focus:ring-slate-950 dark:focus:ring-white transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="font-display text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-zinc-350">
                  Subject Title
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry or opportunity context"
                  className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-zinc-900 bg-white dark:bg-black text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-[1px] focus:ring-slate-950 dark:focus:ring-white transition"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="font-display text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-zinc-350">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Draft your proposal, message context, or invitation guidelines..."
                  required
                  className="w-full px-4 py-3 rounded-lg border border-neutral-200 dark:border-zinc-900 bg-white dark:bg-black text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-[1px] focus:ring-slate-950 dark:focus:ring-white transition resize-none"
                />
              </div>

              {/* Status prompt drawer */}
              <AnimatePresence mode="wait">
                {status.type && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-4 rounded-lg flex items-start gap-2.5 ${
                      status.type === "success"
                        ? "bg-zinc-100 border border-neutral-300 dark:bg-zinc-950/60 dark:border-zinc-800/60 text-zinc-650 dark:text-zinc-300"
                        : "bg-red-500/10 border border-red-500/20 text-red-500"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                    ) : (
                      <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                    )}
                    <span className="text-xs leading-relaxed font-light font-sans">{status.text}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4.5 bg-slate-950 text-white dark:bg-white dark:text-black rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition duration-300 hover:opacity-90 disabled:opacity-50 select-none shadow-xl"
              >
                {loading ? (
                  <>
                    <Loader2 size={13} className="animate-spin" /> Sending message...
                  </>
                ) : (
                  <>
                    <Send size={12} /> Dispatch Transmission
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
