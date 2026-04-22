"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ImageScrubber from "@/components/ImageScrubber";
import CharacterStats from "@/components/CharacterStats";
import FloatingSocialLinks from "@/components/FloatingSocialLinks";

export default function Home() {
  const [spinPct, setSpinPct] = useState(0);

  return (
    <main className="flex items-center justify-center w-screen h-dvh bg-white overflow-hidden">
      {/*
       * Phone-width card. On mobile: edge-to-edge.
       * On desktop: centered phone silhouette against clean white.
       */}
      <div className="relative w-full max-w-[430px] h-full overflow-hidden bg-black">

        {/* ── Image sequence: shows frame 0 instantly, drag to spin ── */}
        <ImageScrubber onProgress={setSpinPct} />

        {/* ── 4 app-style icons orbiting around the character ── */}
        <FloatingSocialLinks spinPct={spinPct} />

        {/* ── Compact stat chip: age / height / weight ── */}
        <CharacterStats />

        {/* ── Top-left identity nameplate ── */}
        <NameTag />

        {/* ── Bottom: spin interaction cue ── */}
        <SpinHint spinPct={spinPct} />
      </div>
    </main>
  );
}

// ─── Nameplate — clean, agency-worthy ────────────────────────────────────────

function NameTag() {
  return (
    <motion.div
      className="absolute top-0 left-0 z-20 px-5 pt-6"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Name — prominent, confident */}
      <h1
        className="text-[17px] font-semibold tracking-[0.04em] leading-tight text-white"
        style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
      >
        Glass Thanaphon Susiwa
      </h1>

      {/* Thin accent line */}
      <div className="mt-1.5 mb-1 w-8 h-[1.5px] rounded-full bg-white/40" />

      {/* Role — small, refined */}
      <p
        className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/50"
        style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
      >
        Content Creator
      </p>
    </motion.div>
  );
}

// ─── Spin hint — circular orbit indicator ────────────────────────────────────

function SpinHint({ spinPct }: { spinPct: number }) {
  const hasStarted = spinPct > 0.015;

  return (
    <motion.div
      className="absolute bottom-7 inset-x-0 z-20 flex flex-col items-center gap-2 pointer-events-none"
      animate={{ opacity: hasStarted ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Two-arc circular arrow — communicates "spin" without words */}
      <motion.svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      >
        {/* Top arc (clockwise) */}
        <path
          d="M 20 6 A 14 14 0 0 1 34 20"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Top arrowhead */}
        <path
          d="M 34 20 L 38 17 M 34 20 L 37 24"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Bottom arc (clockwise) */}
        <path
          d="M 20 34 A 14 14 0 0 1 6 20"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Bottom arrowhead */}
        <path
          d="M 6 20 L 2 23 M 6 20 L 3 16"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>

      <span
        className="text-[9px] font-medium tracking-[0.25em] uppercase text-white/50"
        style={{ textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
      >
        Drag to spin
      </span>
    </motion.div>
  );
}
