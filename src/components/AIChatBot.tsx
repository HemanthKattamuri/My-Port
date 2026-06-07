import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, Loader2, ArrowUpRight, Cpu } from "lucide-react";
import { ChatMessage } from "../types";

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "Welcome. I am Hemanth's generative twin, matching context from his engineering research portfolio. Ask me anything about his machine learning pipelines, course achievements, or research future.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bot/user outputs
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const pushMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          messageHistory: messages.map((m) => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }

      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("AI chat assistant failure:", err);
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: "My neural transmitter experienced a brief latency block. Hemanth possesses core proficiencies in PyTorch, TensorRT, Generative AI models, and computer vision segmentation. Reach out to him directly at khemanth6302@gmail.com!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      pushMessage(inputMessage);
    }
  };

  const suggestChips = [
    "Why hire Hemanth?",
    "Show me his AI/ML projects",
    "Tell me about his ML research focus",
    "How to contact him?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Expanded chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-[90vw] sm:w-[400px] h-[550px] rounded-2xl bg-white dark:bg-black border border-neutral-300 dark:border-zinc-900 shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="p-4 bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="p-1.5 h-8 w-8 rounded-full bg-slate-950 dark:bg-white text-white dark:text-black flex items-center justify-center animate-pulse">
                    <Cpu size={14} />
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-white dark:border-black" />
                </div>
                <div>
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-1">
                    Hemanth&apos;s AI Agent
                    <Sparkles size={10} className="text-zinc-550 shrink-0" />
                  </h3>
                  <p className="text-[9px] font-mono font-medium text-zinc-400 uppercase">Interactive Recruiter Desk</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-900 text-zinc-400 hover:text-black dark:hover:text-white transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Message Pane */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  <div
                    className={`p-3.5 rounded-xl text-xs leading-relaxed font-sans font-light ${
                      msg.sender === "user"
                        ? "bg-slate-950 text-white dark:bg-white dark:text-black rounded-tr-none"
                        : "bg-zinc-100/80 text-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-300 border border-neutral-200/50 dark:border-zinc-900 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[8px] font-mono text-zinc-400 mt-1 uppercase tracking-tighter">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="mr-auto flex items-center gap-2 max-w-[85%] p-3.5 rounded-xl bg-zinc-100/50 dark:bg-zinc-950/20 border border-zinc-200/30 dark:border-zinc-900/30">
                  <Loader2 size={12} className="animate-spin text-zinc-400" />
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider animate-pulse">Running model query...</span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-zinc-100 dark:border-zinc-950 bg-zinc-50/50 dark:bg-zinc-950/10">
              {suggestChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => pushMessage(chip)}
                  className="text-[9px] font-sans font-medium px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-900 text-zinc-650 dark:text-zinc-400 hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-250 cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-zinc-900 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask Hemanth's AI Agent..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 px-3 py-2.5 rounded-lg border border-neutral-200 dark:border-zinc-900 bg-white dark:bg-black text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-[1px] focus:ring-slate-950 dark:focus:ring-white transition"
              />
              <button
                onClick={() => pushMessage(inputMessage)}
                disabled={!inputMessage.trim() || isTyping}
                className="p-2.5 rounded-lg bg-slate-950 text-white dark:bg-white dark:text-black disabled:opacity-40 transition cursor-pointer"
              >
                <Send size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating circular toggle button with subtle aura rings */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-slate-950 text-white dark:bg-white dark:text-black flex items-center justify-center shadow-2xl relative group cursor-pointer transition duration-300 hover:scale-105"
        aria-label="Ask Hemanth's AI Twin"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -45 }} animate={{ rotate: 0 }} exit={{ rotate: 45 }}>
              <X size={18} />
            </motion.div>
          ) : (
            <motion.div key="chat" className="flex flex-col items-center justify-center" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
              <MessageSquare size={18} />
              <span className="text-[6px] font-bold font-mono tracking-wider uppercase mt-0.5">ASK AI</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulsing ring visual */}
        <span className="absolute inset-0 rounded-full border border-slate-950 dark:border-white animate-ping opacity-20 group-hover:opacity-40 pointer-events-none scale-110" />
      </button>
    </div>
  );
}
