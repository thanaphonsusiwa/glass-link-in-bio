"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/** Randomly fires a brief horizontal glitch distortion — purely decorative. */
export default function GlitchOverlay() {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const scheduleGlitch = () => {
      // Random delay between 4–12 seconds
      const delay = 4000 + Math.random() * 8000;
      return setTimeout(() => {
        setGlitching(true);
        // Glitch lasts 120–300ms
        setTimeout(() => setGlitching(false), 120 + Math.random() * 180);
        scheduleGlitch();
      }, delay);
    };
    const id = scheduleGlitch();
    return () => clearTimeout(id);
  }, []);

  if (!glitching) return null;

  return (
    <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
      {/* RGB channel shift slices */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-x-0"
          style={{
            top: `${20 + i * 22}%`,
            height: `${8 + Math.random() * 6}%`,
            background: "rgba(0,255,255,0.06)",
            mixBlendMode: "screen",
          }}
          initial={{ x: 0 }}
          animate={{ x: [0, (i % 2 === 0 ? 1 : -1) * (6 + i * 4), 0] }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      ))}

      {/* Scan-line flash */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,255,255,0.03) 0px, rgba(0,255,255,0.03) 1px, transparent 1px, transparent 3px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
