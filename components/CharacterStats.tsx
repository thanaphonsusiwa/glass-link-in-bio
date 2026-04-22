"use client";

import { motion } from "framer-motion";
import { CHARACTER } from "@/lib/constants";

export default function CharacterStats() {
  const stats = [
    { label: "Age", value: `${CHARACTER.age}` },
    { label: "HT", value: `${CHARACTER.height} cm` },
    { label: "WT", value: `${CHARACTER.weight} kg` },
  ];

  return (
    <motion.aside
      className="absolute left-3 bottom-24 z-20"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
    >
      <div
        className="rounded-2xl px-3 py-2.5 flex flex-col gap-1"
        style={{
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.35)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        }}
      >
        <p className="text-[10px] font-semibold text-white/60 tracking-widest uppercase leading-none mb-0.5">
          {CHARACTER.role}
        </p>
        <div className="flex gap-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="text-sm font-bold text-white leading-tight">{s.value}</span>
              <span className="text-[9px] text-white/50 uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
