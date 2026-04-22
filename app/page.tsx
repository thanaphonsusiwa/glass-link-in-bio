"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import VideoScrubber from "@/components/VideoScrubber";
import CharacterStats from "@/components/CharacterStats";
import FloatingSocialLinks from "@/components/FloatingSocialLinks";
import GlitchOverlay from "@/components/GlitchOverlay";
import { CHARACTER, THEME } from "@/lib/constants";

export default function Home() {
  const [spinPct, setSpinPct] = useState(0); // 0–1 based on video progress

  return (
    // Outer shell: full viewport, mobile 9:16 centered
    <main className="flex items-center justify-center w-screen h-dvh bg-black overflow-hidden">
      {/*
       * Inner stage: max 430px wide, full height on mobile.
       * On desktop this creates a phone-sized card.
       */}
      <div
        className="relative w-full max-w-[430px] h-full overflow-hidden"
        style={{ background: THEME.dark }}
      >
        {/* ── 360° drag-to-spin video ── */}
        <VideoScrubber onProgress={setSpinPct} />

        {/* ── Random glitch fx ── */}
        <GlitchOverlay />

        {/* ── Character stats side-panel ── */}
        <CharacterStats />

        {/* ── Top HUD: name + rotation readout ── */}
        <TopHUD spinPct={spinPct} />

        {/* ── Social link tray at bottom ── */}
        <FloatingSocialLinks />
      </div>
    </main>
  );
}

// ─── Top HUD ─────────────────────────────────────────────────────────────────

function TopHUD({ spinPct }: { spinPct: number }) {
  const angleDeg = Math.round(spinPct * 360);

  return (
    <motion.header
      className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 pt-4 pb-2"
      style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)",
      }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Left: character name + class */}
      <div className="flex flex-col">
        <span
          className="text-xl font-black tracking-widest uppercase leading-none"
          style={{
            color: THEME.primary,
            textShadow: `0 0 14px ${THEME.primary}`,
            fontFamily: "var(--font-geist-mono), monospace",
          }}
        >
          {CHARACTER.name}
        </span>
        <span className="text-[9px] font-mono tracking-[0.4em] text-white/40 uppercase">
          {CHARACTER.role}
        </span>
      </div>

      {/* Right: live rotation angle */}
      <div
        className="flex flex-col items-end px-3 py-1.5 rounded-lg"
        style={{
          background: THEME.panelBg,
          border: `1px solid ${THEME.panelBorder}`,
          backdropFilter: "blur(10px)",
        }}
      >
        <span className="text-[8px] font-mono tracking-widest text-cyan-400/50 uppercase">
          Rotation
        </span>
        <span
          className="text-base font-mono font-bold leading-none"
          style={{ color: THEME.primary, textShadow: `0 0 8px ${THEME.primary}` }}
        >
          {angleDeg}°
        </span>
      </div>
    </motion.header>
  );
}
