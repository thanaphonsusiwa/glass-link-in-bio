"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import VideoScrubber from "@/components/VideoScrubber";
import CharacterStats from "@/components/CharacterStats";
import FloatingSocialLinks from "@/components/FloatingSocialLinks";

export default function Home() {
  const [spinPct, setSpinPct] = useState(0);

  return (
    <main className="flex items-center justify-center w-screen h-dvh bg-white overflow-hidden">
      <div className="relative w-full max-w-[430px] h-full overflow-hidden bg-black">

        {/* ── Full-screen video (drag to spin) ── */}
        <VideoScrubber onProgress={setSpinPct} />

        {/* ── Floating app icons around character ── */}
        <FloatingSocialLinks />

        {/* ── Compact stats card ── */}
        <CharacterStats />

        {/* ── Top-left name tag ── */}
        <NameTag />

        {/* ── Bottom spin hint ── */}
        <SpinHint spinPct={spinPct} />
      </div>
    </main>
  );
}

// ─── Name tag — top left, clean & professional ────────────────────────────────

function NameTag() {
  return (
    <motion.div
      className="absolute top-0 left-0 z-20 px-4 pt-5 pb-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h1
        className="text-lg font-semibold leading-tight text-white tracking-wide"
        style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
      >
        Glass Thanaphon Susiwa
      </h1>
      <p className="text-[11px] text-white/55 tracking-widest mt-0.5">
        Content Creator
      </p>
    </motion.div>
  );
}

// ─── Spin hint — circular arrow indicator at bottom ───────────────────────────

function SpinHint({ spinPct }: { spinPct: number }) {
  // Fade out after user starts scrubbing
  const hasStarted = spinPct > 0.01;

  return (
    <motion.div
      className="absolute bottom-6 inset-x-0 z-20 flex flex-col items-center gap-1.5 pointer-events-none"
      animate={{ opacity: hasStarted ? 0 : 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Circular arrows SVG */}
      <motion.svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        {/* Left arc */}
        <path
          d="M6 18 A12 12 0 0 1 18 6"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* Left arrowhead */}
        <path
          d="M18 6 L15 2 M18 6 L14 7"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right arc */}
        <path
          d="M30 18 A12 12 0 0 1 18 30"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* Right arrowhead */}
        <path
          d="M18 30 L21 34 M18 30 L22 29"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>

      <span
        className="text-[10px] font-medium text-white/60 tracking-widest"
        style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
      >
        Drag to spin
      </span>
    </motion.div>
  );
}
