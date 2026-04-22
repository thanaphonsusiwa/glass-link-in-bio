"use client";

import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/lib/constants";

// Absolute positions for each icon — scattered left & right of the character
const POSITIONS = [
  { side: "right", top: "28%" },  // TikTok — right, upper
  { side: "right", top: "48%" },  // Instagram — right, mid
  { side: "left",  top: "28%" },  // YouTube — left, upper
  { side: "left",  top: "48%" },  // Facebook — left, mid
] as const;

interface FloatingIconProps {
  href: string;
  label: string;
  icon: string;
  color: string;
  index: number;
  position: typeof POSITIONS[number];
}

function FloatingIcon({ href, label, icon, color, index, position }: FloatingIconProps) {
  const isRight = position.side === "right";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="absolute z-20 flex flex-col items-center gap-1"
      style={{
        top: position.top,
        [position.side]: "10px",
      }}
      initial={{ opacity: 0, x: isRight ? 20 : -20, scale: 0.85 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 0.4 + index * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Bob up-down, each icon at a different phase */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          delay: index * 0.5,
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center gap-1"
      >
        {/* App icon — white square with brand-color icon, just like a real phone */}
        <div
          className="w-12 h-12 rounded-[14px] flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.22), 0 1px 4px rgba(0,0,0,0.12)",
          }}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill={color}>
            <path d={icon} />
          </svg>
        </div>

        {/* Label */}
        <span
          className="text-[9px] font-medium text-white/80 tracking-wide drop-shadow"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
        >
          {label}
        </span>
      </motion.div>
    </motion.a>
  );
}

export default function FloatingSocialLinks() {
  return (
    <>
      {SOCIAL_LINKS.slice(0, 4).map((link, i) => (
        <FloatingIcon
          key={link.id}
          {...link}
          index={i}
          position={POSITIONS[i]}
        />
      ))}
    </>
  );
}
