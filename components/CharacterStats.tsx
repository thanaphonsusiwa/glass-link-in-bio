"use client";

import { motion } from "framer-motion";
import { CHARACTER } from "@/lib/constants";

// Compact stat items separated by thin dividers — professional data card style
const STATS = [
  { label: "AGE", value: String(CHARACTER.age) },
  { label: "HT",  value: `${CHARACTER.height}` },
  { label: "WT",  value: `${CHARACTER.weight}` },
];

export default function CharacterStats() {
  return (
    <motion.aside
      className="absolute left-4 bottom-20 z-20"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="rounded-xl px-3.5 py-2.5"
        style={{
          background: "rgba(10,10,10,0.45)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        {/* Stat row: value · divider · value · divider · value */}
        <div className="flex items-center gap-2.5">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2.5">
              <div className="flex flex-col items-center">
                <span className="text-[15px] font-semibold text-white leading-none">
                  {s.value}
                </span>
                <span className="text-[8px] font-medium tracking-[0.18em] text-white/40 uppercase mt-0.5">
                  {s.label}
                </span>
              </div>
              {/* Thin divider between stats */}
              {i < STATS.length - 1 && (
                <div className="w-px h-5 bg-white/20 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
