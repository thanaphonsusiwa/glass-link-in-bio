"use client";

import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/lib/constants";

interface SocialButtonProps {
  href: string;
  label: string;
  icon: string;
  color: string;
  glow: string;
  index: number;
}

function SocialButton({ href, label, icon, color, glow, index }: SocialButtonProps) {
  // Each button floats at a different phase so they feel alive independently
  const floatDelay = index * 0.4;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="relative flex flex-col items-center gap-1.5 group"
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.88 }}
    >
      {/* Float animation wrapper */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          delay: floatDelay,
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        {/* Glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full blur-md"
          style={{ background: glow }}
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
          transition={{ delay: floatDelay, duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Icon button */}
        <div
          className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-150 group-hover:scale-110"
          style={{
            background: "rgba(10,10,20,0.7)",
            border: `1.5px solid ${color}55`,
            backdropFilter: "blur(10px)",
            boxShadow: `0 0 20px ${glow}, inset 0 0 10px rgba(255,255,255,0.04)`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={icon} />
          </svg>
        </div>
      </motion.div>

      {/* Label */}
      <span
        className="text-[9px] font-mono tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ color }}
      >
        {label}
      </span>
    </motion.a>
  );
}

export default function FloatingSocialLinks() {
  return (
    <div className="absolute bottom-10 inset-x-0 z-20 flex justify-center">
      {/* ── Glassmorphism tray ── */}
      <motion.div
        className="flex items-end gap-5 px-6 py-4 rounded-2xl"
        style={{
          background: "rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {SOCIAL_LINKS.map((link, i) => (
          <SocialButton key={link.id} {...link} index={i} />
        ))}
      </motion.div>
    </div>
  );
}
