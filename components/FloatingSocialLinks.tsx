"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { SOCIAL_LINKS } from "@/lib/constants";

// Each icon: which side, base top %, and orbit phase offset (0–1)
// Phase controls how far up/down they drift as the character spins
const POSITIONS = [
  { side: "right", top: "32%", phase: 0    },  // TikTok
  { side: "right", top: "54%", phase: 0.5  },  // Instagram
  { side: "left",  top: "32%", phase: 0.25 },  // YouTube
  { side: "left",  top: "54%", phase: 0.75 },  // Facebook
] as const;

interface FloatingIconProps {
  href: string;
  label: string;
  icon: string;
  color: string;
  index: number;
  position: typeof POSITIONS[number];
  spinPct: number;
}

function FloatingIcon({ href, label, icon, color, index, position, spinPct }: FloatingIconProps) {
  const isRight = position.side === "right";

  // Orbit offset: each icon traces a subtle ellipse as spinPct changes
  // amplitude 12px vertical, 4px horizontal — feels like orbiting
  const angle = (spinPct + position.phase) * Math.PI * 2;
  const orbitX = Math.sin(angle) * (isRight ? -4 : 4);
  const orbitY = Math.cos(angle) * 12;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="absolute z-20 flex flex-col items-center gap-1.5"
      style={{
        top: position.top,
        [position.side]: "12px",
      }}
      initial={{ opacity: 0, x: isRight ? 24 : -24, scale: 0.8 }}
      animate={{
        opacity: 1,
        x: orbitX,
        y: orbitY,
        scale: 1,
      }}
      transition={{
        opacity: { delay: 0.5 + index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        scale:   { delay: 0.5 + index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        x: { type: "spring", stiffness: 80, damping: 20 },
        y: { type: "spring", stiffness: 80, damping: 20 },
      }}
      whileTap={{ scale: 0.88 }}
    >
      {/* Idle bob — runs on top of the orbit offset */}
      <motion.div
        className="flex flex-col items-center gap-1.5"
        animate={{ y: [0, -4, 0] }}
        transition={{
          delay: index * 0.6,
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* App icon — clean white card like iOS */}
        <div
          className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.96)",
            boxShadow:
              "0 8px 24px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          <svg viewBox="0 0 24 24" className="w-[26px] h-[26px]" fill={color}>
            <path d={icon} />
          </svg>
        </div>

        {/* Label */}
        <span
          className="text-[9px] font-semibold text-white/75 tracking-wider"
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.7)" }}
        >
          {label}
        </span>
      </motion.div>
    </motion.a>
  );
}

interface FloatingSocialLinksProps {
  spinPct: number;
}

export default function FloatingSocialLinks({ spinPct }: FloatingSocialLinksProps) {
  return (
    <>
      {SOCIAL_LINKS.slice(0, 4).map((link, i) => (
        <FloatingIcon
          key={link.id}
          {...link}
          index={i}
          position={POSITIONS[i]}
          spinPct={spinPct}
        />
      ))}
    </>
  );
}
