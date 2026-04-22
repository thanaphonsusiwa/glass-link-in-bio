"use client";

import { motion } from "framer-motion";
import { CHARACTER, THEME } from "@/lib/constants";

interface StatRowProps {
  label: string;
  value: string | number;
  delay: number;
}

function StatRow({ label, value, delay }: StatRowProps) {
  return (
    <motion.div
      className="flex justify-between items-center gap-3 border-b border-cyan-400/20 pb-1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
    >
      <span className="text-[10px] font-mono tracking-widest text-cyan-400/60 uppercase">
        {label}
      </span>
      <span className="text-sm font-mono font-bold text-cyan-300">
        {value}
      </span>
    </motion.div>
  );
}

export default function CharacterStats() {
  const stats = [
    { label: "NAME", value: CHARACTER.name },
    { label: "AGE", value: CHARACTER.age },
    { label: "HT", value: `${CHARACTER.height} CM` },
    { label: "WT", value: `${CHARACTER.weight} KG` },
    { label: "CLASS", value: CHARACTER.role },
  ];

  return (
    <motion.aside
      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 w-36"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* ── Panel glass card ── */}
      <div
        className="rounded-xl px-3 py-3 flex flex-col gap-2"
        style={{
          background: THEME.panelBg,
          border: `1px solid ${THEME.panelBorder}`,
          backdropFilter: "blur(12px)",
          boxShadow: `0 0 24px rgba(0,255,255,0.1), inset 0 0 12px rgba(0,255,255,0.04)`,
        }}
      >
        {/* Corner deco */}
        <div className="flex items-center gap-1 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[9px] font-mono tracking-[0.3em] text-cyan-400/70 uppercase">
            Profile
          </span>
        </div>

        {stats.map((s, i) => (
          <StatRow key={s.label} label={s.label} value={s.value} delay={0.1 * i} />
        ))}
      </div>

      {/* ── Scan-line bar ── */}
      <motion.div
        className="h-px w-full"
        style={{ background: `linear-gradient(to right, transparent, ${THEME.primary}, transparent)` }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />
    </motion.aside>
  );
}
